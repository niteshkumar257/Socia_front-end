import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'
import { useParams } from 'react-router-dom'
const ProfileLeft = ({ProfileDetails}) => {

  const {id}=useParams();
  console.log("user Id from the param in ",id);
  return (
   <div className="ProfileSide">
       <LogoSearch/>
     {!id && <ProfileCard userDetails={ProfileDetails?.userInfo} /> }  
       {id && <InfoCard ProfileDetails={ProfileDetails} /> }
       <FollowersCard/>
   </div>
  )
}

export default ProfileLeft