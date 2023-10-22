import {create} from 'zustand'


const useStore = create((set)=>({
    userId:0,
    name:'',
    walletAddress:'',
    isInvestor:false,
    isSeeker:false,
    update:()=>set((state:any)=>({...state}))
})) 


export default useStore;

