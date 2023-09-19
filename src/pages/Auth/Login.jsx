import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../slices/Authslice';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Auth = useSelector((state) => state.Auth);

  useEffect(() => {

    console.log("hello thre")
    if (Auth?.Token) navigate('/profile');
  }, [Auth, navigate]);

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    if(!data?.username){
     return toast.error("username is required");
    }
    if(!data?.password) {
      return  toast.error("password is required");
    }
    dispatch(userLogin(data));
  };

  

  return (

    <div className='parentContainer'>

  
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleForm}>
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
        <button type="submit">Login</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  
    </div>
  );
};

export default Login;
