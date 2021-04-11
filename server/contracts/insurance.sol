// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "https://github.com/aave/protocol-v2/blob/ice/mainnet-deployment-03-12-2020/contracts/interfaces/ILendingPool.sol";
import {IWETH} from "https://github.com/aave/protocol-v2/blob/ice/mainnet-deployment-03-12-2020/contracts/misc/interfaces/IWETH.sol";
import {IAToken} from "https://github.com/aave/protocol-v2/blob/ice/mainnet-deployment-03-12-2020/contracts/interfaces/IAToken.sol";
// import {IWETHGateway} from "https://github.com/aave/protocol-v2/blob/ice/mainnet-deployment-03-12-2020/contracts/misc/interfaces/IWETHGateway.sol";

contract Insurance is ChainlinkClient{
    address payable owner;
    uint256 unit;
    uint256 remain;
    uint256 numOfrecevied;
    uint256 numOfdistribute;
    uint256 dtbMoney;
    uint256 moneyTohost;
    address constant lendingPoolAddressesProviderAddr = 0x88757f2f99175387aB4C6a4b3067c77A695b0349;
    uint256 public userBalance;
    address pooladdr;
    address weth;
    
    bool public clstatus;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    IWETH internal immutable WETH;
    ILendingPool internal lendingPool;
    IAToken internal aWETH;

    struct Client{
        uint status; // not tartget = 0, target = 1
        uint balances; // balances, indexed by address
    }
    
    mapping(address=>Client) private clientInfo;
    address payable[]  keyList;
    
    constructor() public payable {
        // require(msg.value == 1 ether, "1 ehter initial insurance funds required");
        owner = msg.sender;
        unit = 10**18;
        // remain = 1;
        setPublicChainlinkToken();
        oracle = 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b;
        jobId = "982105d690504c5d9ce374d040c08654";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        clstatus = false;
        weth = 0xd0A1E359811322d97991E03f863a0C30C2cF029C;
        WETH = IWETH(weth);
        ILendingPoolAddressesProvider provider = ILendingPoolAddressesProvider(lendingPoolAddressesProviderAddr);
        pooladdr = provider.getLendingPool();
        ILendingPool poolInstance = ILendingPool(pooladdr);
        lendingPool = poolInstance;
        aWETH = IAToken(poolInstance.getReserveData(weth).aTokenAddress);
    }
    
    
    /* chainlink alaram clock */
    function requestAlarmClock(uint256 durationInSeconds) public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfillAlarm.selector);
        // This will return in 90 seconds
        request.addUint("until", block.timestamp + durationInSeconds);
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    function fulfillAlarm(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        clstatus = true;
    }
    
    
    /* aave protocol */
    // address asset = 0xd0A1E359811322d97991E03f863a0C30C2cF029C; // weth eth
    
    function authorizeLendingPool() public{
        require(owner == msg.sender);
        WETH.approve(pooladdr, uint256(-1));
    }
    
    function depositTolending() public payable {
        require(owner == msg.sender);
        WETH.deposit{value: msg.value}();
        lendingPool.deposit(address(WETH), msg.value, msg.sender, 0);
    }
    
    function withdrawFromlending() external {
        userBalance = aWETH.balanceOf(msg.sender);
        aWETH.transferFrom(msg.sender, address(this), userBalance);
        lendingPool.withdraw(address(WETH), userBalance, address(this));
        WETH.withdraw(userBalance);
        _safeTransferETH(msg.sender, userBalance);
    }
    
    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'ETH_TRANSFER_FAILED');
    }
    
    
    /* general smartcontract function */
    
    function giveRight(address targetClient) public {
        require(owner == msg.sender);
        if(clstatus == true)
        {
            clientInfo[targetClient].status = 1;
            clstatus = false;
        }
    }
    
    
    function withdrawForadmin() public {
        require(owner == msg.sender);
        owner.transfer(address(this).balance);
    }
    
    
    function withdrawForclient(uint256 amount) public {
        require(clientInfo[msg.sender].status == 1); // can withdraw when they have right to withdraw.
        require(address(this).balance >= amount);
        remain -= amount;
        amount = amount * unit;
        // clientInfo[msg.sender].balances -= amount;
        clientInfo[msg.sender].status = 0;
        numOfrecevied++;
        msg.sender.transfer(amount);
    } 
    
    /* Distribute insurance money to those who are not involved in the accident. */
    function divideInsurancePayment() public {
        require(owner == msg.sender);
        moneyTohost = (remain*unit) + (address(this).balance * 5 / 100);
        owner.transfer(moneyTohost);
        numOfdistribute = keyList.length - numOfrecevied;
        dtbMoney = (address(this).balance / numOfdistribute);
        for (uint i = 0; i< keyList.length; i++)
        {
            if(clientInfo[keyList[i]].status == 0)
            {
                keyList[i].transfer(dtbMoney);
                clientInfo[keyList[i]].balances = 0;
            }
        }
     }
     
    function insurancePayment() public payable {
        require(msg.value == 0.1 ether, "0.1 ether cost per month!");
        clientInfo[msg.sender].balances += msg.value;
        keyList.push(msg.sender);
    }
     
    function size() public view returns (uint) {
        return uint(keyList.length);
    }
    
    function balance() public view returns (uint256) {
        return clientInfo[msg.sender].balances;
    }
    
    function getInsruanceBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function payTarget() public view returns (uint256) {
        return clientInfo[msg.sender].status;
    }
    
    
    /* To use chainlink, contract has some LINK token and after the end, rest of LINK will be recalled */
    function withdrawLINK() external {
        require(owner == msg.sender);
        LinkTokenInterface linkToken = LinkTokenInterface(chainlinkTokenAddress());
        require(linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))), "Unable to transfer");
    }
    
}