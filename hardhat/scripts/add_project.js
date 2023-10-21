const { ethers } = require('hardhat')

async function addProject() {
  const defund = await ethers.getContract('DeFund')
  await defund.add_project()
  console.log('successfully added')
}

addProject()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
