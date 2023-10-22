import { PayloadAction, createSlice  } from "@reduxjs/toolkit";
import { userApi } from "../services/user";

export interface userState {
    id:number,
    name:string,
    walletAddress:string
    isInvestor:boolean
    isSeeker:boolean
}

export const intialState : userState = {
    id:0,
    name:'',
    walletAddress:'',
    isInvestor:false,
    isSeeker:false
}

const userAuthSlice = createSlice({
    name:'user',
    initialState:intialState,
    reducers:{
        updateUser:(state,{payload}:PayloadAction<userState>)=>{
            state=payload
        }
    },
    extraReducers(builder) {
        builder.addMatcher(userApi.endpoints.getUserFromWallet.matchFulfilled, (state , {payload})=>{
            console.log(payload)
            console.log('updates state???')
            return payload
        })
    },
})

export const { updateUser, } = userAuthSlice.actions;

export default userAuthSlice.reducer
