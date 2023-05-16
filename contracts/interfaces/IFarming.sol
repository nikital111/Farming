// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IFarming {
    event Deposit(address indexed depositor, uint256 deposit, uint256 date);

    event Claim(
        address indexed recepient,
        uint256 deposit,
        uint256 rewards,
        uint256 date
    );

    function deposit(uint256 _amount) external;

    function claim() external returns (uint256);

    function pendingRewards(address _user) external returns (uint256);
}
