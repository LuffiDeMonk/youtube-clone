import React from "react";
import { useDispatch } from "react-redux";

import { HiHome } from "react-icons/hi";
import {
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineHistory,
  MdLogout,
} from "react-icons/md";
import "./Sidebar.css";
import { userLogOut } from "../../Features/AuthSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(userLogOut());
    navigate("/auth");
  };
  return (
    <div className={`sidebar container-fluid ${status}`}>
      <li className="icon-wrapper">
        <HiHome className="bar-icon" />
        <span>Home</span>
      </li>
      <li className="icon-wrapper">
        <MdSubscriptions className="bar-icon" />
        <span>Subscriptions</span>
      </li>
      <li className="icon-wrapper">
        <MdOutlineVideoLibrary className="bar-icon" />
        <span>Library</span>
      </li>
      <li className="icon-wrapper">
        <MdOutlineHistory className="bar-icon" />
        <span>History</span>
      </li>
      <li className="icon-wrapper" onClick={() => handleLogOut()}>
        <MdLogout className="bar-icon" />
        <span>Logout</span>
      </li>
    </div>
  );
};

export default Sidebar;
