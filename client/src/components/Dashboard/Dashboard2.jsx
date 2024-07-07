 
import '../../app.scss';
import Sidebar from "./SideBar Section/Sidebar";
import BodySection from "./Body Section/BodySection";
import './Dashboard.scss'
 import ActivitySection from "./Body Section/Activity Section/ActivitySection";
 import React, { useState } from 'react';
 import TopSection from '../Dashboard/Body Section/Top Section/TopSection';
 import ListingSection from '../Dashboard/Body Section/Listing Section/ListingSection';
 import Dark from '../Dashboard/Body Section/Darkmode/Dark';
 import '../Dashboard/Body Section/BodySection.scss';
 import PasswordGenerator from './Password Generator/PassGen';
export default function Dashboard2() {

    const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="body">
    <div className="container">
      <Sidebar />
      <div className={`mainContent ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <TopSection />
      <div className="activity-container">
        <Dark toggleTheme={toggleTheme} />
        <h1 className="Middletext">Here Are All Your Saved Passwords</h1>
        <PasswordGenerator />
      </div>
      </div>





       
    </div>
  </div>
  )
}
