import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Registration from "./Pages/Auth/Registration/index";
import Login from "./Pages/Auth/Login/index";
import ForgotPassword from "./Pages/Auth/Password/ForgotPassword";
import ResetPassword from "./Pages/Auth/Password/ResetPassword";
import ChangePassword from "./Pages/Auth/Password/ChangePassword";

import Home from "./Pages/index";
import NotFoundPage from "./Pages/NotFoundPage";

import UserContextProvider, { UserContext } from "./context/UserContext";
import VerifiedOtp from "./Pages/Auth/Password/VerifiedOtp";
import { useDispatch } from "react-redux";
import { getUser } from "./store/action/userActions";
import UserProfile from "./Pages/UserProfile";
import MenuBar from "./components/MenuBar";
import EditProfile from "./Pages/EditProfile";
import Search from "./Pages/Search";
import Extera from "./Pages/Extera";

axios.defaults.baseURL = "http://localhost:5000/";

const App = () => {
  const { user } = useContext(UserContext);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/registration/verified-email"
            element={<Registration />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verified-otp" element={<VerifiedOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/extera" element={<Extera />} />
        </Routes>
        {/* {!!user && <span className="capitalize bg-red-900">{user.username}</span>} */}
        <MenuBar />
      </UserContextProvider>
    </>
  );
};

export default App;
