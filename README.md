# DCM Access Control

A decentralized role-based access control smart contract built and tested using Solidity and Hardhat.

## Features

- **Deployer Admin Rights**: Contract deployer is automatically assigned administrative privileges.
- **Admin-Gated Operations**: Sensitive actions such as secret data updates (`setSecret`) are restricted using the `onlyAdmin` modifier.
- **User Management**: Admin can whitelist user addresses via `addUser` mapping logic.
- **Automated Verification**: End-to-end testing script validating both authorized admin execution and unauthorized caller rejection.

## Tech Stack

- **Smart Contract**: Solidity (`^0.8.28`)
- **Framework**: Hardhat v3
- **Blockchain Interaction**: Ethers.js
- **Network**: Hardhat Local Node

## Getting Started

### 1. Install Dependencies
```bash
npm install
