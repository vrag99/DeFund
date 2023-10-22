const { ethers } = require('hardhat')
const amount = 10
async function addProject() {
  const defund = await ethers.getContract('DeFund')
  await defund.add_project("youtube","github","yo","yoyo",amount)
  console.log('successfully added')
}

addProject()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
