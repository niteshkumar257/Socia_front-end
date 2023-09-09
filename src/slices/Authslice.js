import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import { base_url } from "../utils/apiRoutes";
import jwt_decode from "jwt-decode";



export const userLogin=createAsyncThunk("userLogin",async(userInfo)=>
{
  
    const data=await axios.post(`${base_url}/auth/login`,userInfo);
     console.log(data);
    return data.data;
})

export const userRegister=createAsyncThunk("userRegister",async(userInfo)=>
{
    
     const data=await axios.post(`${base_url}/auth/register`,userInfo);
     return data.data;
})

const AuthSlice=createSlice({
    name:'Auth',
    initialState:{
       isLoading:false,
       isError:false,
       Token:null,
       userDetails:null,
       isAdmin:false,
       isAuth:false,
    },
    reducers:{
        userLogout:(state,action)=>
        {
            
          state.Token=null;
          localStorage.removeItem("user-token");
        }

    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state, action) => {
         state.isLoading = true;
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
         state.isLoading = false;
        
         state.Token=action.payload;
         state.isAuth=true;
         state.userDetails=jwt_decode(action.payload).userDetails;
          console.log(action.payload);
         localStorage.setItem("user-token",action.payload);
        
        
        
        
         
        })
        builder.addCase(userLogin.rejected, (state, action) => {
         state.isError = true;
        })
        builder.addCase(userRegister.pending,(state,action)=>
        {
           state.isLoading=true
          
        })
        builder.addCase(userRegister.fulfilled,(state,action)=>
        {
             state.isLoading=false;
             console.log(action.payload);
        })
        builder.addCase(userRegister.rejected,(state,action)=>
        {
            state.isError=false;
        })
    }

})
export const {userLogout}=AuthSlice.actions;
export default AuthSlice.reducer;