"use client"


import { useEffect, useState } from "react";
import { SismoConnectButton, SismoConnectResponse, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-react";
import { CONFIG, AUTHS, CLAIMS, SIGNATURE_REQUEST, AuthType } from "./sismo-connect-config";
import "./home.css";
import { Input, user } from '@nextui-org/react';
import { Button } from "@nextui-org/react";
import {store } from './store'
import { useAppDispatch } from "./hooks/redux";
import { updateUser } from "./features/userSlice";
import { userApi } from "./services/user";/* 
import useStore from "./userStore"; */

export default function Home() {
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] = useState<SismoConnectVerifiedResult>();
  const [pageState, setPageState] = useState<string>("init");
  const [error1, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string | null>(window.localStorage.getItem('walletAddress'));
  const dispatch = useAppDispatch()
  const [trigger , {data,error,isLoading}] = userApi.endpoints.getUserFromWallet.useLazyQuery()
  const [loggedIn  , setLoggedIn] = useState<boolean>(false)
/* 
  const updateUser = useStore((state)=>state?.updateUser) */

  
  useEffect(() => {
    if (walletAddress) {
        trigger({walletAddress})
        if(!isLoading && !error){
        if(!(data?.isInvestor || data?.isSeeker) && data !== undefined){
          setLoggedIn(true)
          window.location.replace('http://localhost:3000/auth')
        } else if(data?.isInvestor){
          setLoggedIn(true)
        } else if (data?.isSeeker){
          setLoggedIn(true)
        }
  
  }}
  }, [walletAddress , data , isLoading, error,trigger]);


  useEffect(()=>{
    if(data) localStorage.setItem('user' , JSON.stringify(data))
  } , [data])


  const handleLogin = async () => {
    const walletAddress = sismoConnectVerifiedResult?.auths?.[0].userId;
    if (sismoConnectVerifiedResult) {
      const body = {
        name,
        walletAddress
      };
      const res = await fetch('http://localhost:8000/auth', {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json;charset=UTF-8" }
      });
      const user = await res.json()
      if (res.ok && walletAddress) {
        dispatch(updateUser(user))
        window.location.replace("http://localhost:3000/choose");
        localStorage.setItem('walletAddress', walletAddress);
      }
    }
  };

  return (
    <>
      <main className="main dark">
        <div className="hvcenter w-full h-screen">
          <h1 className="mb-2 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Welcome to
          </h1>
          <h1 className="mb-4 text-6xl drop-shadow-xl bg-gradient-to-r from-red-500 via-orange-500 to-orange-200 bg-clip-text text-transparent font-extrabold leading-none tracking-tight md:text-6xl lg:text-9xl">
            DeFund
          </h1>
          <p className="text-xl mb-8 font-semibold text-orange-100 lg:text-2xl">We invest in <span className="underline underline-offset-2 decoration-2 decoration-blue-400 dark:decoration-blue-600 lg:decoration-4">world's potential</span> :)</p>
          {pageState === "init" && !loggedIn? (
            <SismoConnectButton
              overrideStyle={{
                background: '#fc711a',
                border: 'none',
              }}
              config={CONFIG}
              auths={AUTHS}
              claims={CLAIMS}
              signature={SIGNATURE_REQUEST}
              text="SSO with Sismo"
              onResponse={async (response: SismoConnectResponse) => {
                setPageState("verifying");

                const verifiedResult = await fetch("/api/verify", {
                  method: "POST",
                  body: JSON.stringify(response),
                });
                const data = await verifiedResult.json();
                console.log(data);
                if (verifiedResult.ok) {
                  setSismoConnectVerifiedResult(data);
                  setPageState("verified");
                } else {
                  setPageState("error");
                  setError(data);
                }
              }}
            />
          ) : (
            <div className="status-wrapper">
              {pageState === "verifying" ? (
                <span className="verifying text-white"> Verifying ZK Proofs... </span>
              ) : (
                <>
                  {Boolean(error1) ? (
                    <span className="error"> Error verifying ZK Proofs: {error1} </span>
                  ) : (
                    <span className="verified text-white"> ZK Proofs verified!</span>
                  )}
                </>
              )}
            </div>
          )}
          {sismoConnectVerifiedResult && (
            <div className="flex max-w-[300px] mt-10 flex-col space-y-5">
              <Input type="text" className="text-white" placeholder="Name" onChange={(e) => setName(e.target.value)} />
              <Button className="bg-[#fc711a]" onClick={handleLogin}>Login</Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
