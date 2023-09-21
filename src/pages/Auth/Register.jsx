import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../slices/Authslice';
import { Link ,useNavigate} from 'react-router-dom';
import {toast} from "react-toastify"
import Lottie from 'lottie-react';
import userLottie1 from "../../img/email-marketing.json";
import Loader from '../../components/Loader/Loader';
const Register = () => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const navigate=useNavigate();
  const [data, setData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleForm = (e) => {
    e.preventDefault();

    if(!data.username) return toast.error("username is requiredd");
    if(!data.firstname) return toast.error("firstname is required");
    if(!data.lastname) return toast.error("lastname is required");
    if(!data.password) return toast.error("password is required");
    dispatch(userRegister(data));
   
    
  
   
  };

  useEffect(()=>{


    console.log(Auth?.username);
    console.log(Auth?.isLoading,Auth?.username)
      if( Auth?.username)
      {
        navigate('/login');
        return ;
      }

  },[Auth])

 
  return (
    <div className='parentContainer'>
 
 <div className="lottie-container">
    <Lottie
        animationData={userLottie1}
        loop={true} 
        autoplay={true} 
        speed={1.5} // Adjust the animation speed
  
      />
    </div>

<div className="register-parent-container">

    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="button-container">
        <button type="submit">Register</button>
  </div>
      
        <div className="text-container">
 <span>Already have account ? , </span>
  <Link to="/login">login</Link>
 </div>
      </form>
    </div>
    </div>
         <Loader open={Auth?.isLoading}/>
    </div>
  );
};

export default Register;
