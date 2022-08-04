// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract TokenFactory is Ownable {
    address[] public Tokens;
    uint256 public TokenCount;

    event TokenCreated(string name, string symbol, uint256 initialSupply, address tokenAddress)
    constructor() {
        TokenCount = 0;
    }

    function createToken(
        uint256 _initialSupply,
        string calldata _name,
        string calldata _symbol
    ) external onlyOwner returns (address) {
        Token newToken = (
            new Token(_initialSupply, _name, _symbol)
        );
        Tokens.push(address(newToken));
        TokenCount++;
        newToken.transferOwnership(msg.sender);
        newToken.transfer(msg.sender, _initialSupply); 
        emit TokenCreated(name, symbol, initialSupply, address(newToken))
        return address(newToken);
    }

    function totalTokenCount() public view returns(uint256) {
        return TokenCount;
    }

    function getTokenAddressAt(uint256 index) public view returns(address) {
        return Tokens[index];
    }

    fallback() external payable {
        // custom function code
    }

    receive() external payable {
        // custom function code
    }
}
