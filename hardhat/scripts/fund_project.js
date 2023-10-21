const { ethers } = require('hardhat')

async function fundProject() {
  const defund = await ethers.getContract('DeFund')
  await defund.give_funding()
}
