import React, { useEffect } from 'react'
import './Posts.css'
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import {useSelector,useDispatch} from "react-redux"
import { getAllPosts } from '../../slices/PostSlice'
import jwtDecode from 'jwt-decode'
import { useParams } from 'react-router-dom'


const Posts = () => {
  const posts=useSelector((state)=>state.Posts)
  const postList=posts.allPost;
  const postDetails=useSelector((state)=>state.Posts);
  const {id:currentUser}=useParams();
 
  const userToken=localStorage.getItem("user-token");
const userInfo=jwtDecode(userToken);
const userId=userInfo.userDetails._id;

  const  dispatch=useDispatch();
  useEffect(()=>
  {
    if(userToken) dispatch(getAllPosts({userId}));
  },[])
 

 const removeOtherPost=()=>
 {
  console.log(currentUser);
  if(currentUser!=undefined)
    postList.filter((post,index)=>post.userId==currentUser);
 }
 console.log(postList);
 
 
  return (
    <div className="Posts">
        {
          postList?.length===0 ? 
        
           <div style={{
            height:100,width:"100%"
           }}>
                <span>
            No posts
          </span>
           </div>
          
         :
      (postList)?.map((post, id) => {
        if (currentUser !== undefined) {
          if (post.userId === currentUser) {
            return <Post key={id} data={post} id={id} />;
          }
        }
      else  return <Post key={id} data={post} id={id} />;
      })}
    </div>
  )
}

export default Posts