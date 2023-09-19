import React, { useEffect, useState } from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { base_url } from "../../utils/apiRoutes";
import { UseSelector, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import coverPicture from "../../img/background2.jpg";
import { useParams } from "react-router-dom";
import { UserDialog } from "../UserListModal/UserList";

const ProfileCard = ({ userDetails }) => {
  const ProfilePage = true;

  const allPost = useSelector((state) => state.Posts)?.allPost;
  const { id: currentUserId } = useParams();
 

  const newPostList = allPost.filter(
    (post) => post.userId === userDetails?._id
  );

  const baseURL = "http://localhost:8080";
  const imageURL = `${baseURL}/images/${userDetails?.profilePicture}`;
  const coverUrl = `${baseURL}/images/${userDetails?.coverPicture}`;


  // open modal follwer 
  const [open,setOpen]=useState(false);
  const followingModalHandler=()=>{
    console.log("hello")
      setOpen(true);
  }

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          style={{
            height: "auto",
            maxHeight: 350,
          }}
          src={coverPicture}
          alt="profile image"
        />
        <img
          style={{
            height: 100,
            width: 100,
            borderRadius: "50%",
          }}
          src={imageURL}
          alt="profile image"
        />
      </div>

      <div className="ProfileName">
        <span>{userDetails?.firstname}</span>
        <span>{userDetails?.about}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{userDetails?.following.length}</span>
            <span style={{cursor:"pointer"}} onClick={()=>followingModalHandler()}>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{userDetails?.followers?.length}</span>
            <span> Followers</span>
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
      {!currentUserId && (
        <span style={{ color: "#00d640" }}>
          <Link
            to={`/profile/${userDetails?._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
      <UserDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default ProfileCard;
