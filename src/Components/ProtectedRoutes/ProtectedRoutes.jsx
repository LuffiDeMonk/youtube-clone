import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../Features/AuthSlice";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const ProtectedRoutes = ({ Component }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [status, setStatus] = useState("");
  const accessToken = useSelector(getAccessToken);
  const navigate = useNavigate();
  const handleStatus = () => {
    if (status === "") {
      setStatus("hidden");
    } else {
      setStatus("");
    }
  };
  useEffect(() => {
    if (!loggedIn && !accessToken) {
      console.log("Back to auth");
      navigate("/auth");
    }
  });
  return (
    <>
      <Navbar handleStatus={handleStatus} />
      <div className="app-container border border-danger">
        <Sidebar status={status} />
        <Component />
      </div>
    </>
  );
};

export default ProtectedRoutes;
