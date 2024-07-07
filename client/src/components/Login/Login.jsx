import React, { useState } from 'react';
import video from '../../assets/admin.mp4';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { FaUserShield } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import { FaLongArrowAltRight } from "react-icons/fa";
import './Login.css';
import '../../app.scss';
import Axios from 'axios';

const Login = () => {
  const [LoginUserName, setLoginUserName] = useState('');
  const [LoginPassword, setLoginPassword] = useState('');

  const LoginUser = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3002/login', {
      LoginUserName,
      LoginPassword
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
        // Handle case when credentials don't match
        alert(response.data.message);
      } else {
        console.log('Login successful', response.data);
        // Redirect to dashboard or handle successful login
        window.location.href = '/dashboard';
      }
    }).catch((error) => {
      console.error('There was an error!', error);
    });
  };

  return (
    <div className="LoginPage flex">
      <div className="videoBackground">
        <video src={video} autoPlay muted loop></video>
      </div>
      <div className="formOverlay">
        <div className="headerDiv">
          <img src={Logo} alt="Logo Image" />
          <h3>Welcome back</h3>
        </div>
        <form className='form grid' onSubmit={LoginUser}>
          <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <div className="input flex">
              <FaUserShield className="icon"/>
              <input type="text" id='username' placeholder='Enter Username'
                onChange={(event) => setLoginUserName(event.target.value)} />
            </div>
          </div>
          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input flex">
              <GoShieldLock className="icon"/>
              <input type="password" id='password' placeholder='Enter Password'
                onChange={(event) => setLoginPassword(event.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn flex">
            <span>Login</span>
            <FaLongArrowAltRight className="icon"/>
          </button>
          <span className="forgot-password">
            Forgot Your Password? <a href="">Click Here</a>
          </span>
          <span className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
