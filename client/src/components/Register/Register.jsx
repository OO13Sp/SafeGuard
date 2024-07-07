import React, { useState } from "react";
import video from '../../assets/admin.mp4';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { FaUserShield, FaLongArrowAltRight } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import './Register.scss';
import '../../app.scss';
import Axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () => {
    Axios.post('http://localhost:3002/register', {
      email: email,
      userName: userName,
      password: password
    }).then(() => {
      console.log('User has been created');
    }).catch(error => {
      console.error('There was an error creating the user!', error);
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
          <h3>Welcome back SafeGuard</h3>
        </div>
        <form action="" className="form grid">
          <span> </span>
           

          <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <div className="input flex">
              <FaUserShield className="icon"/>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter Email"
                onChange={(event) => setEmail(event.target.value)}
            
              />
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="userName">Username</label>
            <div className="input flex">
              <FaUserShield className="icon"/>
              <input 
                type="text" 
                id="userName" 
                placeholder="Enter Username"
                onChange={(event) => setUserName(event.target.value)}
            
              />
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input flex">
              <GoShieldLock className="icon"/>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value)}
               
              />
            </div>
          </div>
          <button type="submit" className="btn flex" onClick={createUser}>
            <span>Register</span> 
            <FaLongArrowAltRight className="icon"/>
          </button>
          <span className="forgot-password">
            Forgot Your Password? <a href="">Click Here</a>
          </span>
          <span className="register-link">
            Already Have an Account? <Link to="/">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
