"use client"

import { useAppSelector } from "../hooks/redux"
import { store } from "../store"

export default function Home(){
    console.log(store.getState())
    const user = useAppSelector((state)=>state.user)
    return (
        <>
            {user.walletAddress}
        </>
    )
}