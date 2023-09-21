import React, { useState, useRef, useEffect } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { createNewpost, getAllPosts } from "../../slices/PostSlice";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { base_url } from "../../utils/apiRoutes";
import {AiOutlineClose} from "react-icons/ai";
import { UserDetails } from "../../slices/ProfileSlice";
import dummyImage from "../../img/dummyImage.png";


const PostShare = () => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user-token");
  const userInfo = jwtDecode(userToken);
  const posts = useSelector((state) => state.Posts);
  const userDetails=useSelector((state)=>state.Profile);
  const userId = userInfo.userDetails._id;

  const [postDetails, setPostDetails] = useState({
    desc: "",
    image: null,
  });
console.log(userInfo);
 
  const handleChange = (e) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setPostDetails({ ...postDetails, image: e.target.files[0] });
  };

  const handleChooseImageClick = () => {
    fileInputRef.current.click();
  };

  const fileInputRef = useRef(null);

  const handleCancelImage=()=>{
    setPostDetails({...postDetails,image:null})
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) return;
    if (!postDetails?.desc) return;

    const formData = new FormData();
    formData.append("file", postDetails.image);
    formData.append("desc", postDetails.desc);
    formData.append("userId", userId);

    axios
      .post(`${base_url}/post/createPost`, formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllPosts({ userId }));
          // Reset input fields
          setPostDetails({
            desc: "",
            image: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(()=>{
  dispatch(UserDetails(userId));
  },[])
  const profileDetails=useSelector((state)=>state.Profile);
  console.log(profileDetails?.userInfo?.profilePicture);

  const baseURL = 'http://localhost:8080'
  const profilePicture=`${base_url}/images/${profileDetails?.userInfo?.profilePicture}`
  return (
    <div className="PostShare">
      {
        !profileDetails?.userInfo?.profilePicture ? <img src={dummyImage}/> :  <img src={profilePicture} alt="" />
      }
     
      <div>
        <input
          type="text"
          placeholder="What's happening"
          onChange={handleChange}
          name="desc"
          value={postDetails.desc}
        />
        <div className="postOptions">
          {/* Hidden file input */}
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handlePhoto}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {/* Icon/button to trigger file input */}
          <div
            className="option"
            style={{ color: "var(--photo)", cursor: "pointer" }}
            onClick={handleChooseImageClick}
          >
            <UilScenery />
            Choose Image
          </div>
          <button className="button ps-button" onClick={handleSubmit}>
            Share
          </button>
        </div>
        {postDetails?.image && (
  <div style={{ position: 'relative', width: '90%', height: '400px' }}>
    {

    }
    <img
      style={{
        height: 400,
        width: "90%",
      }}
      src={URL.createObjectURL(postDetails?.image)}
      alt="Image Preview"
    />
    <AiOutlineClose   style={{
        position: 'absolute',
        top: '10px', // Adjust the top position as needed
        right: '10px', // Adjust the right position as needed
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px',
      }} onClick={handleCancelImage}/>
  </div>
)}
      </div>
    </div>
  );
};

export default PostShare;
