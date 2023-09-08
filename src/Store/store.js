import {configureStore} from "@reduxjs/toolkit";
import Authslice from "../slices/Authslice";

export const store=configureStore({
    reducer:{
        Auth:Authslice
    }
})