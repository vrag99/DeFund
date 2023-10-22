"use client"


import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'




const MY_TOKEN_LIST = [
  {
    "name": "Ape Coin",
    "address": "0x328507DC29C95c170B56a1b3A758eB7a9E73455c",
    "symbol": "APE",
    "decimals": 6,
    "chainId": 5,
    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
]



export default function App() {
    return (
        <div className='flex justify-center mt-20'>
            <SwapWidget 
                tokenList={MY_TOKEN_LIST}
            />
        </div>
    )
}
