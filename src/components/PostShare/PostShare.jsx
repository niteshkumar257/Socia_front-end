import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { createNewpost ,getAllPosts} from "../../slices/PostSlice";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { base_url } from "../../utils/apiRoutes";


const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user-token");
  const userInfo = jwtDecode(userToken);
  const posts=useSelector((state)=>state.Posts)
  const userId = userInfo.userDetails._id;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const [desc, setDesc] = useState("");
  
  const handleChange = (e) => {
    setDesc(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();


  if(!userId) return ;
  if(!desc) return ;


 const formData=new FormData();
   formData.append("image",imageRef);
  
     axios.post(`${base_url}/post/createPost`,{
      userId:userId,desc:desc
     }).then((res)=>
     {
      if(res.status==200)
      {
         dispatch(getAllPosts({userId})); 
         setDesc("");
      }
     }).catch((err)=>
     {
        console.log(err);
     })
   

   
  };

  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="" />
      <div>
        <input
          type="text"
          placeholder="What's happening"
          onChange={handleChange}
          value={desc}
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button className="button ps-button" onClick={handleSubmit}>
            Share
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={image.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
