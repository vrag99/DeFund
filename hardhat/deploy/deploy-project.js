const { network } = require('hardhat')
const { developmentChains } = require('../helper-hardhat-config')

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const { verify } = require('../utils/verify')

  log('----------------------------------------------------')
  const arguments = []
  const DeFund = await deploy('DeFund', {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log('Verifying...')
    await verify(DeFund.address, arguments)
  }
}
