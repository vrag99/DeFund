// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract DeFund {
  mapping(uint256 => address) public project_active;
  mapping(uint256 => address) public project_funded;

  uint256 public project_ID = 0;

  event AddProject(address indexed maker, uint256 _project);
  event FundedProject(
    address indexed funder,
    address indexed maker,
    uint256 _project,
    uint256 amount,
    address erc20ContractAddress
  );

  function add_project() public {
    project_active[project_ID] = msg.sender;
    emit AddProject(msg.sender, project_ID);
    project_ID++;
  }

  function give_funding(
    uint256 Project,
    IERC20 erc20,
    uint256 amount
  ) external payable returns (bool) {
    address owner = project_active[Project];
    bool success = erc20.transferFrom(msg.sender, owner, amount);
    require(success);

    delete project_active[Project];
    project_funded[Project] = owner;

    emit FundedProject(msg.sender, owner, Project, amount, address(erc20));
    return true;
  }
}
