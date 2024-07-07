// Dark.jsx

import React, { useState } from 'react';
import './Dark.scss';

const Dark = ({ toggleTheme }) => {
  return (
    <div className="dark-button">
      <button onClick={toggleTheme}>Enter The Dark Realm</button>
    </div>
  );
};

export default Dark;
