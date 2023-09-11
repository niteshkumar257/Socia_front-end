import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
const PostSide = ({userId}) => {
 
  return (
   <div className="PostSide">
       <PostShare/>
       <Posts userId={userId}/>
   </div>
  )
}

export default PostSide