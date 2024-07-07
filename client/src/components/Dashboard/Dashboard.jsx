import React from "react";
import '../../app.scss';
import Sidebar from "./SideBar Section/Sidebar";
import BodySection from "./Body Section/BodySection";
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="body">
      <div className="container">
        <Sidebar />
        <BodySection />

         
      </div>
    </div>
  );
}

export default Dashboard;
