// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract dcm {
    address public admin;
    string public secretData;

    // Users store panna mapping (address -> true/false)
    mapping(address => bool) public isUser;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized: Admin only");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setSecret(string memory _newData) external onlyAdmin {
        secretData = _newData;
    }

    // Pudhu function: Admin mattum thaan users-ah add panna mudiyum
    function addUser(address _user) external onlyAdmin {
        isUser[_user] = true;
    }
}