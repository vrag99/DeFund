"use client";

import { useEffect, useState } from "react";
import {
  SismoConnectButton,
  SismoConnectResponse,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-react";
import {
  CONFIG,
  AUTHS,
  CLAIMS,
  SIGNATURE_REQUEST,
  AuthType,
} from "./sismo-connect-config";

export default function Home() {
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] = useState<SismoConnectVerifiedResult>();
  const [sismoConnectResponse, setSismoConnectResponse] = useState<SismoConnectResponse>();
  const [pageState, setPageState] = useState<string>("init");
  const [error, setError] = useState<string>("");

  const [name , setName] = useState<string>("")

  useEffect(()=>{
    const checkAuth =async () => {
      const res = await fetch("http://localhost:8000/check-authentication",{
      credentials:'include'
     })
     if(res.ok){
      window.location.replace('http://localhost:3000/home')
     }
    }
    checkAuth()
  }, [])


  const handleLogin = async ()=>{
    console.log(sismoConnectVerifiedResult)
    if(sismoConnectVerifiedResult){
     const body = {
      name,
      walletAddress:sismoConnectVerifiedResult.auths?.[0].userId
    }
    console.log(body)
    const res = await fetch('http://localhost:8000/auth' , {
      method:"POST",
      body:JSON.stringify(body),
       headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    const res1 = await res.body
    if(res.ok){
      window.location.replace("http://localhost:3000/choose")
    } }
   }
    return (<>
      <main className="main">
        {pageState == "init" ? (
          <>
            <SismoConnectButton
              config={CONFIG}
              auths={AUTHS}
              claims={CLAIMS}
              signature={SIGNATURE_REQUEST}
              text="Prove With Sismo"
              onResponse={async (response: SismoConnectResponse) => {
                setSismoConnectResponse(response);
                setPageState("verifying");
                
                const verifiedResult = await fetch("/api/verify", {
                  method: "POST",
                  body: JSON.stringify(response)
                });
                const data = await verifiedResult.json();
                console.log(data)
                if (verifiedResult.ok) {
                  setSismoConnectVerifiedResult(data);
                  setPageState("verified");
                } else {
                  setPageState("error");
                  setError(data);
                }
              }}
            />
          </>
        ) : (
          <>
            <div className="status-wrapper">
              {pageState == "verifying" ? (
                <span className="verifying"> Verifying ZK Proofs... </span>
              ) : (
                <>
                  {Boolean(error) ? (
                    <span className="error"> Error verifying ZK Proofs: {error} </span>
                  ) : (
                    <span className="verified"> ZK Proofs verified!</span>
                  )}
                </>
              )}
            </div>
          </>
        )}
        {sismoConnectVerifiedResult && (
          <>
            <input onChange={(e)=>setName(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </>
        )} 
      </main>
    </>
    );
};
