import React, { useState } from "react";

import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { UserDetails } from "../../slices/ProfileSlice";
import FollowersCard from "../FollowersCard/FollowersCard";
export const UserDialog = ({ open, setOpen }) => {
  const userToken = localStorage.getItem("user-token");
  const user = jwtDecode(userToken);
  const userId = user.userDetails._id;
 const userInfo = useSelector((state) => state.Profile)?.userInfo;
  const userFollowersList = userInfo?.following;
  const close = () => {
    setOpen(false);
  };
  const baseURL = 'http://localhost:8080'
  return (
    <Dialog onClose={close} open={open} sx={{width:"100%",height:"auto"}}>
      <DialogTitle>FollwersList</DialogTitle>
      <div style={{width:300,height:"auto",padding:20}}>
      <FollowersCard/>
      </div>
      
    
    </Dialog>
  );
};
