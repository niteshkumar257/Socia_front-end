import { Modal, useMantineTheme } from "@mantine/core";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { base_url } from "../../utils/apiRoutes";
import { useState } from "react";

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const userToken = localStorage.getItem("user-token");
  const user = jwtDecode(userToken);
  const userId = user.userDetails._id;


  const [userDetails,setUserDetails]=useState({
    Firstname:"",
    lastname:"",
    worksAt:"",
    livesIN:"",
    Country:"",
    relationShip:""

  })
  const handleChange=(e)=>
  {
       setUserDetails({...userDetails,[e.target.name]:e.target.value});
  }
  const updateUserDetails=()=>
  {
     axios.put(`${base_url}\${userId}`,{
      userId,userDetails
     }).then((res)=>
     {
      console.log(res);
     }).catch((err)=>
     {
      console.log(err);
     })
  }

  

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="FirstName"
            placeholder="First Name"
            onChange={handleChange}
          />

          <input
            type="text"
            className="infoInput"
            name="LastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAT"
            placeholder="Works at"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIN"
            placeholder="LIves in"
            onChange={handleChange}
          />

          <input
            type="text"
            className="infoInput"
            name="Country"
            placeholder="Country"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationShip"
            placeholder="RelationShip Status"
            onChange={handleChange}
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profileImg'/>
            Cover Image
            <input type="file" name="coverImg" />
        </div>

        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
