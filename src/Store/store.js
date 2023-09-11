import {configureStore} from "@reduxjs/toolkit";
import Authslice from "../slices/Authslice";
import ProfileSlice from "../slices/ProfileSlice";
import PostSlice from "../slices/PostSlice";

export const store=configureStore({
    reducer:{
        Auth:Authslice,
        Profile:ProfileSlice,
        Posts:PostSlice
    }
})