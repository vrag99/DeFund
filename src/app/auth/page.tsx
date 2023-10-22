"use client";
import { useEffect, useState } from "react";
// import {Card, CardHeader, CardBody, Image, CardFooter, Button} from "@nextui-org/react";
import ImageCard from "../components/imagecard";
import { useAppSelector } from "../hooks/redux";
import { userApi } from "../services/user";
import { store } from "../store";

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Auth() {

  const [userId , setUserId] = useState<number>(0)
  useEffect(()=>{

  const userJson = localStorage.getItem('user')
  if(userJson) {
    const user = JSON.parse(userJson)
    setUserId(user.id)
  }
  } , [])
  console.log(userId)
  const handleInvestorClick = async () => {
    console.log(userId)
    const res = await fetch('http://localhost:8000/investor/create', {
      method: 'POST',
      body: JSON.stringify({userId}),
      headers: { "Content-type": "application/json;charset=UTF-8" }
    })
    const inverstor = await res.json()
    console.log(inverstor)
    if (res.ok) {
      window.location.replace('http://localhost:3000/home')
    }
  }

  const handleSeekerClick = async () => {
    const res = await fetch('http://localhost:8000/investor/seeker', {
      method: 'POST',
      body: JSON.stringify({userId}),
      headers: { "Content-type": "application/json;charset=UTF-8" }
    })
    const seeker = await res.json()
    console.log(seeker)
    if (res.ok) {
      window.location.replace('http://localhost:3000/home')
    }
  }

  return (
    <>
      <h1 className="mb-2 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        How do you want to register yourself?
      </h1>
      <div className="flex space-x-24 mt-10">
        <ImageCard heading="Investor" description="Fund world changing ideas." image="https://source.unsplash.com/WMD64tMfc4k" handlePress={handleInvestorClick}/>
        <ImageCard heading="Seeker" description="Have an impactful idea?" image="https://source.unsplash.com/XVqwbImMR4M" handlePress={handleSeekerClick}/>
      </div>
    </>
  );
}
