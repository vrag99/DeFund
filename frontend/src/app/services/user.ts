import {createApi  , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
interface userAuthState{
    id:number,
    name:string,
    walletAddress:string,
    isInvestor:boolean,
    isSeeker:boolean
}

interface userWalletAddr{
    walletAddress:string
}


export const userApi  = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000" , credentials:'include'}),
    tagTypes:['User'],
    endpoints:(builder)=>({
        getUserFromWallet : builder.query<userAuthState , userWalletAddr>({
            query:(body)=>({
                url:'/check-wallet',
                method:"POST",
                body,
            }),
            providesTags:['User']
        })
    })
})

export const {useGetUserFromWalletQuery } = userApi

