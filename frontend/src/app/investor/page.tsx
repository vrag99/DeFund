"use client";

import "./profile.css";

import {
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";;
import { Textarea ,Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ProjectCard from "../components/projectCard.tsx";
import Moralis from "moralis-v1";


import { useQuery } from "@apollo/client";


import defundAbi from '../../../constants/DeFund.json'
import { useMoralis , useWeb3Contract } from 'react-moralis'


import { useAccount, useConnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import GET_ACTIVE_ITEMS from "../../../constants/subgraohQuery.ts";

export default function SeekerProfile() {

  const [userData , setUserData] = useState<any>(null)
  const [project , setProjects] = useState<any>(null)


  //form data

  const [name,setName] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const [gitHubLink , setGitHubLink] = useState<string>('')
  const [videoLink , setVideoLink] = useState<string>('')
  const [amount  , setAmount] = useState<number>(0)



  const {chainId,account,isWeb3Enabled} = useMoralis()

  console.log(chainId , account , isWeb3Enabled)

  const chainString = chainId ? parseInt(chainId).toString() : "31337"
  const defundAddress = "0xB6Ec1Fc4a4BE223259f293981Bfc211AC9636B02"
  const [proceeds , setProceeds] = useState("0")
  let params:any;
  const {runContractFunction} = useWeb3Contract(params) 

    
  const handleFunding =async (projectId : number , amount:number) => {

    await  Moralis.enableWeb3()

      const defundOptions = {
        abi:defundAbi,
        contractAddress:defundAddress,
        functionName:"send_funding",
        params:{
          youtube:videoLink,
          github:gitHubLink,
          name:name,
          description:description,
          amount:amount,
          Project:projectId
        }
      }

      await runContractFunction({
        params:defundOptions,
        onSuccess:()=>console.info('ssss'),
        onError:(error)=>console.error(error)
      })
  }


    useEffect(()=>{
      const user = localStorage.getItem('user')
      if(user){
        const userData = JSON.parse(user)
        console.log(user)
        setUserData(userData) 
        if(!(userData?.isSeeker  || userData?.isInvestor)) window.location.replace("http://localhost:3000/choice")
      }} , [])

      const {loading , error ,data} = useQuery(GET_ACTIVE_ITEMS)
      console.log(data)
      useEffect(()=>{
        setProjects(data?.addProjects)
  },[])


  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  return (
    <>
      <div className="w-full h-screen dark backdrop-blur-3xl">
      <>
      {
          isConnected ? (
            <div>Connected to {ensName ?? address}</div>
          ) : 
          <button onClick={() => connect()} className="text-white">Connect Wallet</button>
        }
        </>
        <div className="p-10">
          { userData &&
        <>
          <h1 className=" text-4xl text-center p-4 mb-2 font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Hello, {userData?.name}, 👋
          </h1>
          <div className="text-center">
            <Chip
              variant="shadow"
              classNames={{
                base: "bg-gradient-to-br p-4 mb-8 from-orange-500 to-red-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow text-md shadow-black text-white font-semibold truncate",
              }}
            >
              Wallet Address: {userData?.walletAddress}
            </Chip>
            <br />
            <Divider className="max-w-md mx-auto my-10" />
          </div>
            
          <h2 className="text-2xl p-4 mb-2 font-semibold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Your Funded Projects➴
          </h2>
          <div className="flex flex-row flex-wrap justify-between max-w-4/5">
          <div className="flex flex-row space-x-3">
            <ProjectCard inputProps={{
              name: "ZK Phi",
              description:"A simple zero knowledge project",
              currentFunding:1,
              reqFunding: 10,
              github: "https://github.com/",
              video: "https://youtube.com/",
              isInvestor: userData?.isInvestor,
              handleFunding:handleFunding,
              id:1
            }} />
            


          </div> 
          </div>
          </>
          }
        </div>
      </div>
    </>
  );
  }
