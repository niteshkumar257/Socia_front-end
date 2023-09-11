import React, { useEffect } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard.jsx/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../../slices/ProfileSlice";
import jwtDecode from "jwt-decode";

const Profile = () => {
  const userToken = localStorage.getItem("user-token");
  const user = jwtDecode(userToken);
  const userId = user.userDetails._id;
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const ProfileDetails = useSelector((state) => state.Profile);


  useEffect(() => {
    dispatch(UserDetails(userId));
  }, []);

  return (
    <div className="Profile">
      <ProfileLeft ProfileDetails={ProfileDetails} />

      <div className="Profile-center">
        <ProfileCard userDetails={ProfileDetails?.userInfo} />
        <PostSide userId={ProfileDetails?.userInfo?._id} />
      </div>

      <RightSide />
    </div>
  );
};

export default Profile;
