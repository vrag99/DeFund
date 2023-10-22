// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { store } from "./store";
import { Provider  }  from "react-redux"
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MoralisProvider } from "react-moralis";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})


export function Providers({children}: { children: React.ReactNode }) {
  return (
    <MoralisProvider
    initializeOnMount={false}
    >
      <NextUIProvider>
        <WagmiConfig config={config}>
         <Provider store={store}>
        {children}
          </Provider>
          </WagmiConfig>
      </NextUIProvider>
      </MoralisProvider>
  )
}