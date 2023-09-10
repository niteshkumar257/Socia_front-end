import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import axios from "axios";
import { base_url } from "../../utils/apiRoutes";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../slices/PostSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineLike ,AiFillLike} from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import jwtDecode from "jwt-decode";

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user-token");
  const user = jwtDecode(userToken);
  const userId = user.userDetails._id;
  console.log(data.likes);
  const [liked, setLiked] = useState(data.likes?.includes(userId));
  const [likes, setLikes] = useState(data.likes.length);

  const DeletePost = (userId, postId) => {
    axios
      .delete(`${base_url}/post/${postId}/${userId}`)
      .then((res) => {
        dispatch(getAllPosts({ userId }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likePost = (postId) => {
   
    setLiked((prev)=>!prev);
    if (!liked) {
      setLikes((prev) => prev + 1);
     
    } else {
      setLikes((prev) => prev - 1);
     
    }
    axios.put(`${base_url}/post/${postId}/like`,{
      userId
    }).then((res)=>
    {
      console.log(res);
    }).catch((err)=>
    {
      console.log(err);
    })


  };

  return (
    <div className="Post">
      <img src={data.img} alt="" />

      <div className="postReact">
        {
          !liked ?
          <AiOutlineLike
          size={30}
        style={{cursor:'pointer'}}
        onClick={() => likePost(data._id)}
        /> :
        <AiFillLike size={30} style={{cursor:'pointer'}}
        onClick={() => likePost(data._id)}
        />
        }
       
        <AiOutlineEdit size={30} style={{ cursor: "pointer" }} />

        <AiOutlineDelete
          onClick={() => DeletePost(data.userId, data._id)}
          size={30}
          style={{
            cursor: "pointer",
          }}
        />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
