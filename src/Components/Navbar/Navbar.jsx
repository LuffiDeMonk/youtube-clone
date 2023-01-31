import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { BsMicFill } from "react-icons/bs";
import { GrAppsRounded, GrNotification } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { getImageURL } from "../../Features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { searchVideos, setSearchTerm } from "../../Features/YoutubeSlice";
const Navbar = ({ handleStatus }) => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    handleStatus();
  };
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(searchVideos(term));
    dispatch(setSearchTerm(term));
    navigate("/search");
  };
  const imageURL = useSelector(getImageURL);
  return (
    <div className="navbar-container container-fluid">
      <div className="left">
        <div className="left-container d-flex align-items-center">
          <div className="hamburger" onClick={() => handleClick()}>
            <RxHamburgerMenu className="title" />
          </div>
          <Link
            to="/"
            className="d-flex youtube align-items-center text-decoration-none text-dark"
          >
            <img
              src="https://www.logo.wine/a/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.svg"
              alt=""
            />
            <span className="header-logo text-decoration-none">YouTube</span>
          </Link>
        </div>
      </div>
      <div className="center">
        <form onSubmit={() => submitHandler(event)}>
          <input
            type="text"
            placeholder="Search"
            required
            onChange={(event) => setTerm(event.target.value)}
          />
          <button type="submit">
            <FiSearch />
          </button>
        </form>
      </div>
      <div className="right">
        <div className="icon-container">
          <img src={imageURL} alt="" />
        </div>
        <GrAppsRounded className="icons" />
        <GrNotification className="icons" />
      </div>
    </div>
  );
};

export default Navbar;
