import Head from 'next/head'
import Image from 'next/image'
import { Form, useNotification, Button } from 'web3uikit'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { ethers } from 'ethers'
import defundabi from '../../constants/abi.json'
import networkMapping from '../../constants/contractAddresses.json'

console.log(networkMapping)

export default function Home() {}
