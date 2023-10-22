import userSlice from "./features/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from "./services/user";


export const store = configureStore({
    reducer:{
        user:userSlice,
        [userApi.reducerPath]:userApi.reducer
    },
    ///@ts-ignore
    middleware:(getDefaultMiddleware)=>(
        getDefaultMiddleware().concat([userApi.middleware])
    )
})

setupListeners(store.dispatch)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

