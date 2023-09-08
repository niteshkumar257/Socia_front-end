import React, { useEffect } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard.jsx/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";

const Profile = () => {
 
 const Auth=useSelector((state)=>state.Auth);
   const dispatch=useDispatch();
 

  return (
    <div className="Profile">
      <ProfileLeft />

      <div className="Profile-center">
        <ProfileCard />
        <PostSide />
      </div>

      <RightSide />
    </div>
  );
};

export default Profile;
