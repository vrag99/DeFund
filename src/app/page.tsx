"use client";

import { useState } from "react";
import {
  SismoConnectButton,
  SismoConnectResponse,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-react";
import { CONFIG, AUTHS, CLAIMS, SIGNATURE_REQUEST, AuthType } from "./sismo-connect-config";
import "./home.css";

export default function Home() {
  const [sismoConnectVerifiedResult, setSismoConnectVerifiedResult] =
    useState<SismoConnectVerifiedResult>();
  const [sismoConnectResponse, setSismoConnectResponse] = useState<SismoConnectResponse>();
  const [pageState, setPageState] = useState<string>("init");
  const [error, setError] = useState<string>("");

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
          {pageState == "init" ? (
            <>
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
                  setSismoConnectResponse(response);
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
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                {" "}
                RESET{" "}
              </button>
              <br></br>
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
              <h3>Verified Auths</h3>
              <table>
                <thead>
                  <tr>
                    <th>AuthType</th>
                    <th>Verified UserId</th>
                  </tr>
                </thead>
                <tbody>
                  {sismoConnectVerifiedResult.auths.map((auth, index) => (
                    <tr key={index}>
                      <td>{AuthType[auth.authType]}</td>
                      <td>{auth.userId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </>
  );
}
