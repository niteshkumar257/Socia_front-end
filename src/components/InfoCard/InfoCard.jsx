import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import {useDispatch,useSelector} from "react-redux"
import { userLogout } from "../../slices/Authslice";
import { useNavigate } from "react-router-dom";


const InfoCard = ({ProfileDetails}) => {
 
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const [modalOpened, setModalOpened] = useState(false);
  const usertoken=localStorage.getItem('user-token');
  useEffect(()=>
  {
     if(!usertoken) navigate('/login');
  },[usertoken])
  const logoutHandler=()=>
  {
    
      dispatch(userLogout());
      navigate('/login');
  }

 
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
          
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{ProfileDetails?.userInfo?.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{ProfileDetails?.userInfo?.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{ProfileDetails?.userInfo?.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default InfoCard;
