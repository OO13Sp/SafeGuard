import React, { useState, useEffect } from 'react';
import './ActivitySection.scss';
import Axios from 'axios';
import zxcvbn from 'zxcvbn';
import facebookLogo from './Logos/Facebook.png';
import googleLogo from './Logos/Google.png';
import microsoftLogo from './Logos/Microsoft.jpg';
import defaultLogo from './Logos/Apple.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ActivitySection = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [formUserName, setformUserName] = useState('');
  const [formPassword, setformPassword] = useState('');
  const [company, setcompany] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [passwords, setPasswords] = useState([]);

  const SavePass = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:3002/dashboard', {
      UserEmail: UserEmail,
      formUserName: formUserName,
      formPassword: formPassword,
      company: company
    }).then(() => {
      console.log('User has been created');
      toast.success('Password saved successfully!');
      fetchPasswords();
    }).catch(error => {
      console.error('There was an error creating the user!', error);
      toast.error('There was an error saving the password.');
    });
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = () => {
    Axios.get('http://localhost:3002/dashboard')
      .then(response => {
        setPasswords(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => {
        console.error('There was an error fetching the passwords!', error);
        setPasswords([]);
      });
  };

  const togglePasswordVisibility = (index) => {
    const updatedPasswords = [...passwords];
    updatedPasswords[index].showPassword = !updatedPasswords[index].showPassword;
    setPasswords(updatedPasswords);
  };

  const getPasswordStrength = (password) => {
    const { score } = zxcvbn(password);
    const strength = ['very-weak', 'weak', 'fair', 'good', 'strong'];
    return strength[score];
  };

  return (
    <div className={`activity-container ${showForm ? 'show-form' : ''}`}>
      <h2 className='Middletext'>Website Passwords</h2>

      {showForm && (
        <div className="password-form">
          <form onSubmit={SavePass}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formUserName}
              onChange={(event) => setformUserName(event.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={UserEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formPassword}
              onChange={(event) => setformPassword(event.target.value)}
              required
            />
            <label htmlFor="company">Company</label>
            <select
              id="company"
              name="company"
              value={company}
              onChange={(event) => setcompany(event.target.value)}
              required
            >
              <option value="">Select a company</option>
              <option value="Facebook">Facebook</option>
              <option value="Google">Google</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Company 4">Company 4</option>
              <option value="Company 5">Company 5</option>
              <option value="Company 6">Company 6</option>
              <option value="Company 7">Company 7</option>
              <option value="Company 8">Company 8</option>
              <option value="Company 9">Company 9</option>
              <option value="Company 10">Company 10</option>
            </select>
            <button type="submit">Save</button>
          </form>
          <button className="close-button" onClick={() => setShowForm(false)}>Close Form</button>
        </div>
      )}

      <div className="password-list">
        {passwords.map((password, index) => (
          <div key={index} className="password-item">
            <div className="password-text">
              <p>Email: {password.email}</p>
              <p>Password: {password.showPassword ? password.password : '********'}</p>
              <div className="password-strength-meter">
                <div
                  className={`strength-bar ${getPasswordStrength(password.password)}`}
                  style={{ width: `${(zxcvbn(password.password).score + 1) * 20}%` }}
                />
              </div>
            </div>
            <div className="password-logo">{getCompanyLogo(password.company)}</div>
            <button className="show-password-button" onClick={() => togglePasswordVisibility(index)}>
              {password.showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className='button-container' onClick={() => setShowForm(!showForm)}>Add Password</button>
      </div>
      <ToastContainer />
    </div>
  );
};

const getCompanyLogo = (companyName) => {
  switch (companyName) {
    case 'Facebook':
      return <img src={facebookLogo} alt="Facebook Logo" className="company-logo" />;
    case 'Google':
      return <img src={googleLogo} alt="Google Logo" className="company-logo" />;
    case 'Microsoft':
      return <img src={microsoftLogo} alt="Microsoft Logo" className="company-logo" />;
    default:
      return <img src={defaultLogo} alt="Default Logo" className="company-logo" />;
  }
};

export default ActivitySection;
