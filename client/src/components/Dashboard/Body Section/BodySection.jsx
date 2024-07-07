import React, { useState } from 'react';
import TopSection from './Top Section/TopSection';
import ListingSection from './Listing Section/ListingSection';
import ActivitySection from './Activity Section/ActivitySection';
import Dark from './Darkmode/Dark';
import './BodySection.scss';

const BodySection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`mainContent ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <TopSection />
      <div className="activity-container">
        <Dark toggleTheme={toggleTheme} />
        <h1 className="Middletext">Here Are All Your Saved Passwords</h1>
      </div>
      <ActivitySection />
      <ListingSection />
    </div>
  );
};

export default BodySection;
