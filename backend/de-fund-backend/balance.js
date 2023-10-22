const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');


const runApp = async (address) => {
  await Moralis.start({
    apiKey: "YOUR_API_KEY",
  });
  
  const address = address;
  const chain = EvmChain.ETHEREUM;
  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain,
  });
  return response.toJSON()
}

module.exports = runApp