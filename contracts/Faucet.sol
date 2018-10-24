// Version of Solidity compiler this program was written for
pragma solidity ^0.4.22;

import "./Mortal.sol";

// Our first contract is a faucet!
contract Faucet is mortal {
    // Give out ether to anyone who asks
    function withdraw(uint withdraw_amount) public {

        // Limit withdrawal amount
        require(withdraw_amount <= 0.1 ether);

        // Send the amount to the address that requested it
        msg.sender.transfer(withdraw_amount);
        emit Withdrawal(msg.sender, withdraw_amount);
    }
    
    // Accept any incoming amount
    function () public payable {
        //emit Deposit(msg.sender, msg.value);
    }

    event Withdrawal(address indexed to, uint amount);
    event Deposit(address indexed from, uint amount);    
}