pragma solidity ^0.6.0;

contract Insurance {
    address payable owner;
    uint256 unit;
    
    mapping(address=>uint256) private balanceOf; // balances, indexed by address
    mapping(address=>uint256) private insurancePayTarget; // not tartget = 0, target = 1
    
    constructor() public payable {
        require(msg.value == 10 ether, "10 ehter initial insurance funds required");
        owner = msg.sender;
        unit = 10**18;
    }
    
    function withdraw() public {
        require(owner == msg.sender);
        owner.transfer(address(this).balance);
    }
    
    function withdraw(uint256 amount) public {
        // require(insurancePayTarget[msg.sender] == 1);
        require(address(this).balance >= amount);
        amount = amount * unit;
        // insurancePayTarget[msg.sender] = 0;
        msg.sender.transfer(amount);
    } 
    
    /* Distribute insurance money to those who are not involved in the accident. */
    // function divideInsurancePayment() public {
    //     require(owner == msg.sender);
        
    // }
    
    function insurancePayment() public payable {
        require(msg.value == 1 ether, "1 ether cost per month!");
        balanceOf[msg.sender] += msg.value;
    }
    
    function balance() public view returns (uint256) {
        return balanceOf[msg.sender];
    }
    
    function getInsruanceBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function payTarget() public view returns (uint256) {
        return insurancePayTarget[msg.sender];
    }
    
}