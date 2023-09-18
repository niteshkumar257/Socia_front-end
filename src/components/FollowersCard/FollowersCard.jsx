import React ,{useState,useEffect} from 'react'
import './FollowersCard.css'
import {useSelector,useDispatch} from "react-redux"
import axios from "axios"
import {base_url} from "../../utils/apiRoutes";
import jwtDecode from 'jwt-decode';
import { UserDetails } from '../../slices/ProfileSlice';





import { Followers } from '../../Data/FollowersData'
const FollowersCard = () => {

    const userToken = localStorage.getItem("user-token");
    const user = jwtDecode(userToken);
    const userId = user.userDetails._id;

  const userInfo =useSelector((state)=>state.Profile)?.userInfo;
   const userFollowersList=userInfo?.following;  
   

    const dispatch=useDispatch();
    const ProfileDetails=useSelector((state)=>state.Profile);
    const followers=ProfileDetails?.userInfo?.followers;
     const [allUsers,setAllUser] =useState();
     useEffect(()=>
     {
    axios.get(`${base_url}/user/allUsers`)
    .then((res)=>{
        
        setAllUser(res.data.users);
        console.log(res.data.users);

    }).catch((err)=>
    {
        console.log(err);
    })
     },[userFollowersList])
    
     const followoUserAction=(userId_to_follow)=>
     {
        console.log(userId_to_follow);
        const I_am_following=userFollowersList.includes(userId_to_follow) ;
        if(I_am_following)
        {
            axios.put(`${base_url}/user/${userId_to_follow}/unfollow`,{
                currentUserId:userId
              })
              .then((res)=>
              {
                console.log(res);
                dispatch((UserDetails(userId)));
              }).catch((err)=>
              {
                console.log(err);
              })
        }
        else 
        {
            axios.put(`${base_url}/user/${userId_to_follow}/follow`,{
                currentUserId:userId
              })
              .then((res)=>
              {
                console.log(res);
                dispatch(UserDetails(userId))
              }).catch((err)=>
              {
                console.log(err);
              })
        }
     }
    
     const baseURL = 'http://localhost:8080'
   
  return (
    <div className="FollowersCard">
        <h3>People You may Know</h3>
       
        {  
        allUsers?.length===0 ? <span style={{
            color:'black'
        }} >No followers</span>
       : allUsers?. map((follower, id)=>{
            return( follower._id!=userId &&   !follower.followers.includes(userId) && 
                <div key={id} className="follower">
                    <div>
                        <img src={`${baseURL}/images/${follower?.profilePicture}`} alt="" className='followerImage' />
                        <div className="name">
                            <span>{follower?.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className='button fc-button' onClick={()=>followoUserAction(follower?._id)}>
                        {
                             follower.followers.includes(userId) ? "Unfollow":"Follow"
                        }
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default FollowersCard