import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../utils/apiRoutes";
import jwtDecode from "jwt-decode";



export const getAllPosts = createAsyncThunk("getAllposts", async ({userId}) => {
    
  console.log(userId);
  const res = await axios.get(`${base_url}/post/${userId}/allPosts`);

  return res.data;
});

export const createNewpost=createAsyncThunk("createNewpost",async({userId,desc})=>
{
  console.log(userId,desc);
     const res=await axios.post(`${base_url}/post/createPost`,{
      userId:userId,
      desc:desc
     });
    
     return res.status;
})

const PostSlice = createSlice({
  name: "PostSlice",
  initialState: {
    allPost: [],
    isLoading: false,
    isError: false,
    isSuccess:false
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
        
      state.isLoading = false;
      state.allPost = action.payload.allPost;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(createNewpost.pending,(state,action)=>{
      state.isLoading=true;
    })
    builder.addCase(createNewpost.fulfilled,(state,action)=>
    {
      state.isLoading=false;
      state.isSuccess=action.payload==200?true:false
      
    })
    builder.addCase(createNewpost.rejected,(state,action)=>{
        state.isError=false;
    })
  },

});

export default PostSlice.reducer;
