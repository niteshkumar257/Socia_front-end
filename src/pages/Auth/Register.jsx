import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../slices/Authslice';
import { Link } from 'react-router-dom';


const Register = () => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
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
    dispatch(userRegister(data));
  };

  return (
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
        <button type="submit">Register</button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default Register;
