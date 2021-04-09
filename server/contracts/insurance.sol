pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract Insurance is ChainlinkClient {
    address payable owner;
    uint256 unit;
    uint256 remain;
    uint256 numOfrecevied;
    uint256 numOfdistribute;
    uint256 dtbMoney;
    uint256 moneyTohost;
    
    struct Client{
        uint status; // not tartget = 0, target = 1
        uint balances; // balances, indexed by address
    }
    
    mapping(address=>Client) private clientInfo;
    // mapping(address=>uint256) private insurancePayTarget; // not tartget = 0, target = 1
    address payable[]  keyList;
    
    constructor() public payable {
        require(msg.value == 10 ether, "10 ehter initial insurance funds required");
        owner = msg.sender;
        unit = 10**18;
        remain = 10;
    }
    
    function withdraw() public {
        require(owner == msg.sender);
        owner.transfer(address(this).balance);
    }
    
    function withdraw(uint256 amount) public {
        // require(insurancePayTarget[msg.sender] == 1); // using chainlink client
        require(address(this).balance >= amount);
        remain -= amount;
        amount = amount * unit;
        clientInfo[msg.sender].balances -= amount;
        clientInfo[msg.sender].status = 2;
        numOfrecevied++;
        // insurancePayTarget[msg.sender] = 0;
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
     
    function size() public view returns (uint) {
        return uint(keyList.length);
    }
    
    function insurancePayment() public payable {
        require(msg.value == 1 ether, "1 ether cost per month!");
        clientInfo[msg.sender].balances += msg.value;
        keyList.push(msg.sender);
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
    // function withdrawLINK(address to, uint256 value) public onlyOwner {
    //     require(LINK.transfer(to, value), "Not enough LINK");
    // }
    
}