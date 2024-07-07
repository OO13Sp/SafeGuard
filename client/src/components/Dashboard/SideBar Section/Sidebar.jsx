import React, { useState } from 'react';
import Logo from '../../../assets/logo.svg';
import { IoMdSpeedometer } from "react-icons/io";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { CiTrophy } from "react-icons/ci";
import { FaChartPie } from "react-icons/fa";
import { MdOutlineTrendingUp } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { FaBars } from "react-icons/fa"; // Importing the menu icon
import './Sidebar.scss';
import { Link } from'react-router-dom';
import { MdOutlinePassword } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sideBar ${isOpen ? 'open' : 'closed'}`}>
      <div className="logoDiv">
        <img src={Logo} alt="SafeGaurd Logo" />
        {isOpen && <h2>SafeGaurd</h2>}
        <button className="toggleButton" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="menuDiv">
            <h3 className="divTitle">Quick Menu</h3>
            <ul className="menuLists">
              <li className="listItem">
                <Link to="/dashboard" className="menuLink">
                  <IoMdSpeedometer className="icon" />
                  <span className="smallTextt">Dashboard</span>
                </Link>
              </li>
              <li className="listItem">
                <Link to="/dashboard2" className="menuLink">
                <MdOutlinePassword  className='icon'/>
                  <span className="smallTextt">Password Generator</span>
                </Link>
              </li>
              <li className="listItem">
                <Link to="/explore" className="menuLink">
                  <MdOutlineExplore className="icon" />
                  <span className="smallTextt">Explore</span>
                </Link>
              </li>
              <li className="listItem">
                <Link to="/allservices" className="menuLink">
                  <CiTrophy className="icon" />
                  <span className="smallTextt">All Services</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="settingsDiv">
            <h3 className="divTitle">Settings</h3>
            <ul className="menuLists">
              <li className="listItem">
                <Link to="/charts" className="menuLink">
                  <FaChartPie className="icon" />
                  <span className="smallTextt">Charts</span>
                </Link>
              </li>
              <li className="listItem">
                <Link to="/trends" className="menuLink">
                  <MdOutlineTrendingUp className="icon" />
                  <span className="smallTextt">Trends</span>
                </Link>
              </li>
              <li className="listItem">
                <Link to="/contact" className="menuLink">
                  <MdContacts className="icon" />
                  <span className="smallTextt">Contact</span>
                </Link>
              </li>
              <li className="listItem">
                <Link to="/billing" className="menuLink">
                  <FaCreditCard className="icon" />
                  <span className="smallTextt">Billing</span>
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
