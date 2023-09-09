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


const Post = ({data}) => {

   const dispatch=useDispatch();
  const DeletePost=(userId,postId)=>
  {
    console.log(userId)
       axios.delete(`${base_url}/post/${postId}/${userId}`).then((res)=>
       {
        console.log(res);
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
            <img src={data.liked?Heart: NotLike} alt="" />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
             <button onClick={()=>DeletePost(data.userId,data._id)} className="button ps-button" style={{height:30,width:100}}>Delete</button>
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