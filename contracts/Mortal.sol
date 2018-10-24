// Version of Solidity compiler this program was written for
pragma solidity ^0.4.22;

import "./Owned.sol";

contract mortal is owned {
    // Contract destroyer
    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
}