import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Registration from "./Pages/Auth/Registration/index";
import Login from "./Pages/Auth/Login/index";
import ForgotPassword from "./Pages/Auth/Password/ForgotPassword";
import ResetPassword from "./Pages/Auth/Password/ResetPassword";
import ChangePassword from "./Pages/Auth/Password/ChangePassword";

import Home from "./Pages/index";
import NotFoundPage from "./Pages/NotFoundPage";

// import UserContextProvider from "../context/UserContext";

axios.defaults.baseURL = "http://localhost:5000/";

const App = () => {
  return (
    // <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/registration/verified-email"
            element={<Registration />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    // </UserContextProvider>
  );
};

export default App;
