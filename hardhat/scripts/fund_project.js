const { ethers } = require('hardhat')
const project_ID = 3
const erc20address = '0x4d224452801aced8b2f0aebe155379bb5d594381'
const amount = 10
async function fundProject() {
  const defund = await ethers.getContract('DeFund')
  await defund.give_funding(project_ID, erc20address, amount)
}

fundProject()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
