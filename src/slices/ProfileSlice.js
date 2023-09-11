import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { base_url } from "../utils/apiRoutes"
import { userLogin } from "./Authslice";


export const UserDetails=createAsyncThunk("userDetails",async(userId)=>
{
    const res=await  axios(`${base_url}/user/${userId}/getUserDetails`);
    return res.data;
})

const ProfileSlice=createSlice({
    name:"userProfile",
    initialState:{
    isLoading:false,
    isError:false,
    userInfo:null
    },
    reducers:{

    },extraReducers:(builder)=>{
        builder.addCase(UserDetails.pending,(state,action)=>
        {
            state.isLoading=true;
        })
        builder.addCase(UserDetails.fulfilled,(state,action)=>
        {
            
            state.isError=false;
            state.isLoading=false;
            state.userInfo=action.payload;
        
        })
        builder.addCase(UserDetails,(state,action)=>
        {
          state.isError=true;
        })
        
    }
})
export default ProfileSlice.reducer;