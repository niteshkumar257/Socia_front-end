import React from 'react'
import './FollowersCard.css'
import {useSelector,useDispatch} from "react-redux"


import { Followers } from '../../Data/FollowersData'
const FollowersCard = () => {

    const dispatch=useDispatch();
    const ProfileDetails=useSelector((state)=>state.Profile);
    const followers=ProfileDetails?.userInfo?.followers;
    console.log(followers);
  
  return (
    <div className="FollowersCard">
        <h3>Who is following you</h3>
       
        {  
        followers?.length===0 ? <span style={{
            color:'black'
        }} >No followers</span>
       : followers?. map((follower, id)=>{
            return(
                <div key={id} className="follower">
                    <div>
                        <img src={follower.img} alt="" className='followerImage' />
                        <div className="name">
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className='button fc-button'>
                        Follow
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default FollowersCard