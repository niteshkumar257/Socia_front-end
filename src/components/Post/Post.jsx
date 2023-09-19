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
import { useParams } from "react-router-dom";

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user-token");
  const user = jwtDecode(userToken);
  const userId = user.userDetails._id;
  const {id}=useParams();
  console.log(id);
 

  console.log(data);
  const [liked, setLiked] = useState(data.likes?.includes(userId));
  const [likes, setLikes] = useState(data.likes.length);
  const [isEditClicked,setIsEditCliked]=useState(false);
  const [newMessage,setNewMessaage]=useState("");

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

  const editPost=(postId)=>
  {
      setIsEditCliked(true);
      setNewMessaage(data.desc);

  }
  const EditPost=(postId)=>
  {

    console.log(`${base_url}/post/${postId}/updatePost`);
      axios.put(`${base_url}/post/${postId}/updatePost`,{
        userId,desc:newMessage
      }).then((res)=>{
        console.log(res);
           setIsEditCliked(false);
           setNewMessaage("");
           dispatch(getAllPosts({userId}))
           
      }).catch((err)=>
      {
        console.log(err);
        setIsEditCliked(false);
        setNewMessaage("");
      })
  }
  const baseURL = 'http://localhost:8080'
  const imageURL = `${base_url}/images/${data.image}`;
  return (
    <div className="Post">
      <img src={imageURL} alt="post image" className="postImage" />

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
       {data.userId===userId &&   <AiOutlineEdit size={30} style={{ cursor: "pointer" }} onClick={editPost} /> }
      
        {data.userId===userId &&   <AiOutlineDelete
          onClick={() => DeletePost(data.userId, data._id)}
          size={30}
          style={{
            cursor: "pointer",
          }}
        />}
       
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        {
          isEditClicked  ?   <input
          type="text"
          name="newMesssage"
          value={newMessage}
          className="input-field"
          onChange={(e)=>setNewMessaage(e.target.value)}
          ></input> : <span> {data.desc}</span>
        }
       {
        isEditClicked &&   <button  className="button ps-button" onClick={()=>EditPost(data._id)}>Edit post</button>
       }
       
      </div>
    </div>
  );
};

export default Post;
