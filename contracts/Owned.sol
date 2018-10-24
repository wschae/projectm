// Version of Solidity compiler this program was written for
pragma solidity ^0.4.22;

contract owned {
    address owner;
    
    // Initialize Faucet contract
    constructor() public {
        owner = msg.sender;    
    }

    // Access control modifier    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}