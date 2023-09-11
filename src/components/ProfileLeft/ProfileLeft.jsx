import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
const ProfileLeft = ({ProfileDetails}) => {
  return (
   <div className="ProfileSide">
       <LogoSearch/>
       <InfoCard ProfileDetails={ProfileDetails} />
       <FollowersCard/>
   </div>
  )
}

export default ProfileLeft