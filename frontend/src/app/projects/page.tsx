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
  const [projects , setProjects] = useState<any>(null)


  //form data

  const [name,setName] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const [gitHubLink , setGitHubLink] = useState<string>('')
  const [videoLink , setVideoLink] = useState<string>('')
  const [amount  , setAmount] = useState<number>(0)



  const {chainId,account,isWeb3Enabled} = useMoralis()

  console.log(chainId , account , isWeb3Enabled)

  const chainString = chainId ? parseInt(chainId).toString() : "31337"
  const defundAddress = "0x17Fe9424EEF56Fa2A9Fd47615B0645B987Be4cBa"
  let params:any;
  const {runContractFunction} = useWeb3Contract(params) 

    
  const handleFunding = async (projectId : number , amount:number) => {

    await  Moralis.enableWeb3()

      const defundOptions = {
        abi:defundAbi,
        contractAddress:defundAddress,
        functionName:"send_funding",
        params:{
          Project:projectId,
          amount:amount,
          erc20:'0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0'
        }
      }

      await runContractFunction({
        params:defundOptions,
        onSuccess:()=>console.info('ssss'),
        onError:(error)=>console.error(error)
      })

      window.location.replace('http://localhost:3000/investor')
  }


  const handleSeekFunding =async () => {

    await  Moralis.enableWeb3()

    if(userData.id){
      const body = {
        name,
        description,
        gitHubLink,
        youtubeVideoLink:videoLink,
        amountSeeking:amount,
        userId:userData.id
      }

      const res = await fetch('http://localhost:8000/project/create' , {
        method:'POST',
        body:JSON.stringify(body),
        headers:{
          "Content-type": "application/json;charset=UTF-8" 
        }})
      const projectAdded = await res.json()
      setProjects([...projects , projectAdded])}

      const defundOptions = {
        abi:defundAbi,
        contractAddress:defundAddress,
        functionName:"add_project",
        params:{
          youtube:videoLink,
          github:gitHubLink,
          name:name,
          description:description,
          amount:amount
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
        setUserData(userData)
      }} , [])

      const {loading , error ,data} = useQuery(GET_ACTIVE_ITEMS)
      console.log(data)
      useEffect(()=>{
        setProjects(data?.addProjects)
  },[data])


  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
            {(userData?.isSeeker) ? (
               <Button onPress={onOpen} variant="ghost" className="font-bold shadow-lg">
               Add New Project
             </Button>
            ) : null}
           
            <Modal
              className="text-orange-100 dark"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
              backdrop="blur"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">New Project</ModalHeader>
                    <ModalBody>
                      <Input aria-label="12" label="Project Name" variant="flat"  onChange={(e)=>setName(e.target.value)} />
                      <Textarea aria-label="23" label="Description" placeholder="Enter your description"  onChange={(e)=>setDescription(e.target.value)} />
                      <Input label="Video Link"  aria-label="123" variant="flat"  onChange={(e)=>setVideoLink(e.target.value)} />
                      <Input  label="GitHub Link"aria-label="123" variant="flat" onChange={(e)=>setGitHubLink(e.target.value)}/>
                      <div className="w-full flex space-x-2">
                        <Input label="Amount"aria-label="123" type="number" variant="flat"  onChange={(e)=>setAmount(parseInt(e.target.value))}/>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button className="bg-orange-600 font-semibold" onPress={onClose} onClick={handleSeekFunding}>
                        Seek Funding
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <Divider className="max-w-md mx-auto my-10" />
          </div>

          <h2 className="text-2xl p-4 mb-2 font-semibold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
           { (userData?.isSeeker) ? "Your Projects ➴ ":"Trending Projects"}
          </h2>

          <div className="flex flex-row flex-wrap justify-between max-w-4/5">
          <div className="flex flex-row space-x-3">
          {projects?.map((project:any , index:number)=>(
            <ProjectCard inputProps={{
              name: project.name,
              description: project.description,
              currentFunding: 0,
              reqFunding: project.amount,
              github: "https://github.com/",
              video: "https://youtube.com/",
              isInvestor: userData?.isInvestor,
              handleFunding:handleFunding,
              id:project.id
            }} />
            
          ))}
            <ProjectCard inputProps={{
              name: "ZK Phi",
              description:"A simple zero knowledge project",
              currentFunding:0,
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