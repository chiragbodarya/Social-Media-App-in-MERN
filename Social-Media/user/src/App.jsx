import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Registration from "./Pages/Auth/Registration/index";
import Login from "./Pages/Auth/Login/index";
import ForgotPassword from "./Pages/Auth/Password/ForgotPassword";
import ResetPassword from "./Pages/Auth/Password/ResetPassword";
import ChangePassword from "./Pages/Auth/Password/ChangePassword";

import Home from "./Pages/index";
import NotFoundPage from "./Pages/NotFoundPage";

import { UserContext } from "./context/UserContext";
import VerifiedOtp from "./Pages/Auth/Password/VerifiedOtp";
import { useDispatch } from "react-redux";
import { getUser } from "./store/action/userActions";
import UserProfile from "./Pages/UserProfile";
import MenuBar from "./components/MenuBar";
import EditProfile from "./Pages/EditProfile";
import Search from "./Pages/Search";
import AddPost from "./Pages/AddPost";
import Extera from "./Pages/Extera";
import SearchUserDetails from "./Pages/SearchUserDetails";
import UserFollower from "./Pages/UserFollower";
import UserFollowing from "./Pages/UserFollowing";

axios.defaults.baseURL = `http://localhost:${process.env.BACKEND_PORT}/`;

const App = () => {
  const { user } = useContext(UserContext);
  // console.log(user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Home />} />
        <Route path="/registration/verified-email" element={<Registration />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verified-otp" element={<VerifiedOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/extera" element={<Extera />} />
        <Route path="/user/:userId" element={<SearchUserDetails />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/user/follower" element={<UserFollower />} />
        <Route path="/user/following" element={<UserFollowing />} />
      </Routes>
      {!user ? null : <MenuBar />}
    </>
  );
};

export default App;
