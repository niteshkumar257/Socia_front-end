import React, { useEffect, useState } from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { base_url } from "../../utils/apiRoutes";
import { UseSelector, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProfileCard = ({userDetails}) => {
 
  const ProfilePage = true;
  
   const allPost=useSelector((state)=>state.Posts)?.allPost;
   console.log(userDetails);
  
 const newPostList= allPost.filter((post)=>post.userId===userDetails._id);
  
  
 
 
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="ProfileName">
        <span>{userDetails?.firstname}</span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{userDetails?.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{userDetails?.followers?.length}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{newPostList?.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      <span>
          <Link to={`/profile/${userDetails?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      
    </div>
  );
};

export default ProfileCard;
