import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { getAccessToken, getUserInfo } from "../../Features/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(getUserInfo());
  };
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  });
  return (
    <div className="container-fluid wrapper">
      <div className="content">
        <img
          src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
          alt=""
        />
        <Link
          to="/"
          className="Login btn btn-success"
          onClick={() => handleClick()}
        >
          Click to Login
        </Link>
      </div>
    </div>
  );
};

export default Login;
