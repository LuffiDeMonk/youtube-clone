import React from "react";
import { Routes, Route } from "react-router-dom";

import Body from "./Components/Body/Body";
import Login from "./Components/Login/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

import "./App.css";

import Search from "./Search/Search";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ProtectedRoutes Component={Body} />} />
      <Route path="/search" element={<ProtectedRoutes Component={Search} />} />
      <Route path="/auth" element={<Login />} />
      <Route
        path="/search/:searchID"
        element={<ProtectedRoutes Component={VideoPlayer} />}
      />
    </Routes>
  );
};

export default App;
