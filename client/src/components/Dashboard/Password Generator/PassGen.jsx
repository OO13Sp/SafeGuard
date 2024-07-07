import React, { useState } from 'react';

import './PassGen.scss';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let newPassword = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      newPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(newPassword);
  };

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>
      <button onClick={generatePassword}>Generate Password</button>
      {password && (
        <div className="password-display">
          <p>{password}</p>
          <button onClick={() => navigator.clipboard.writeText(password)}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
