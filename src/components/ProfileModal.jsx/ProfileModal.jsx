import { Modal, useMantineTheme } from "@mantine/core";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { base_url } from "../../utils/apiRoutes";
import { useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { UserDetails } from "../../slices/ProfileSlice";

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const userToken = localStorage.getItem("user-token");
  const user = jwtDecode(userToken);
  const userId = user.userDetails._id;
  const dispatch=useDispatch();
  

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    worksAt: "",
    livesin: "",
    Country: "",
    relationShip: "",
    profilePicture: "",
    coverPicture: "",
    about:""
  });
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handlePhoto = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.files[0] });
  };
  const updateUserDetails = (e) => {
    e.preventDefault();
    const formData = new FormData();
   
    formData.append("profilePicture", userDetails.profilePicture);
    formData.append("coverPicture",userDetails.coverPicture);
   
    formData.append("firstname", userDetails.firstname);
    formData.append("lastname",userDetails.lastname);
    formData.append("worksAt",userDetails.worksAt);
    formData.append("livesin",userDetails.livesin);
    formData.append("relationship",userDetails.relationShip);
    formData.append("about",userDetails.about);
  
    formData.append("userId", userId);
  setModalOpened(false);
    axios
      .put(`${base_url}/user/${userId}`, formData)
      .then((res) => {
        console.log(res);
        dispatch(UserDetails(userId));
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="44%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >

<h3>Your info</h3>
      <form className="infoForm">
       

        
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
          />
      

        
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
          />
        

       
          <input
            type="text"
            className="infoInput"
            name="livesin"
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
      

      
          <input
            type="text"
            className="infoInput"
            name="relationShip"
            placeholder="RelationShip Status"
            onChange={handleChange}
          />
            <input
            type="text"
            className="infoInput"
            name="about"
            placeholder="about"
            onChange={handleChange}
          />
       

      
          
          <input
            name="profilePicture"
            type="file"
            accept=".png, .jpg, .jpeg"
            placeholder="Choose a profile Picture"
            onChange={handlePhoto}
          />
        
      

        <button className="button infoButton" onClick={updateUserDetails}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
