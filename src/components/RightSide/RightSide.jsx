import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import { BiHomeSmile } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { BsChatDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const navigate=useNavigate();
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <BiHomeSmile
            size={30}
            style={{ textDecoration: "none", color: "inherit" }}
          />
        </Link>

        <UilSetting
          size={30}
          style={{ textDecoration: "none", color: "inherit" }}
        />
        <GrNotification
          size={30}
          style={{ textDecoration: "none", color: "inherit" }}
        />
        <BsChatDots
          onClick={()=>navigate('/chat')}
         
          size={30}
          style={{ textDecoration: "none", color: "inherit",cursor:'pointer' }}
        />
      </div>

      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
