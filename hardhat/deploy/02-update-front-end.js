const {
  frontEndContractsFile,
  frontEndAbiFile,
} = require('../helper-hardhat-config')
const fs = require('fs')
require('dotenv').config()
const { network } = require('hardhat')

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log('Writing to front end...')
    await updateContractAddresses()
    await updateAbi()
    console.log('Front end written!')
  }
}

async function updateAbi() {
  const defund = await ethers.getContract('DeFund')
  fs.writeFileSync(
    frontEndAbiFile,
    defund.interface.format(ethers.utils.FormatTypes.json)
  )
}

async function updateContractAddresses() {
  const defund = await ethers.getContract('DeFund')
  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractsFile, 'utf8')
  )
  if (network.config.chainId.toString() in contractAddresses) {
    if (
      !contractAddresses[network.config.chainId.toString()].includes(
        defund.address
      )
    ) {
      contractAddresses[network.config.chainId.toString()] = defund.address
    }
  } else {
    contractAddresses[network.config.chainId.toString()] = [defund.address]
  }
  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ['all', 'frontend']
