import React from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import axios from 'axios'
import { base_url } from '../../utils/apiRoutes'
import {useSelector,useDispatch} from "react-redux"
import { getAllPosts } from '../../slices/PostSlice'
import { AiOutlineDelete } from "react-icons/ai";
import {AiOutlineLike} from "react-icons/ai"


const Post = ({data}) => {

   const dispatch=useDispatch();
  const DeletePost=(userId,postId)=>
  {
  
       axios.delete(`${base_url}/post/${postId}/${userId}`).then((res)=>
       {
         
        dispatch(getAllPosts({userId}));
       }).catch((err)=>
       {
        console.log(err);
       })
  }


  return (
    <div className="Post">
        <img src={data.img} alt="" />


        <div className="postReact">
          
           <AiOutlineLike size={30}/>
          <AiOutlineDelete onClick={()=>DeletePost(data.userId,data._id)} size={30} style={{
            cursor:'pointer'
          }}/>
            
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{data.likes} likes</span>

        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post