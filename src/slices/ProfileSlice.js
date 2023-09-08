import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

const ProfileSlice=createSlice({
    name:"userProfile",
    initialState:{
    isLoading:false,
    isError:false,
    userInfo:null
    }
})