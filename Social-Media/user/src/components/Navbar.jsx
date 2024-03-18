import React, { useContext, useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaKey } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  // console.log("user data in navbar :  ", user);
  const [settingVisible, setSettingVisible] = useState(false);

  const toggleSetting = () => {
    setSettingVisible(!settingVisible);
  };

  return (
    <>
      <div className="flex justify-between items-center lg:w-[70%] mx-auto py-2 px-4">
        <p className="text-[22px] font-bold">
          {!!user && <span className="capitalize">{user.username}</span>}
        </p>
        <IoIosSettings onClick={toggleSetting} />
      </div>
      {settingVisible && (
        <div className="absolute min-h-[100vh] h-[100%] w-64 right-[0px] top-[0px] bg-[#85e0e0] px-4 py-3">
          <p className="flex justify-end py-2">
            <IoMdClose onClick={toggleSetting} />
          </p>
          <hr />
          <Link
            to="/change-password"
            className="flex items-center gap-4 bg-[#ccebff] hover:bg-black/20 rounded-md my-2 py-2 px-3"
          >
            <FaKey className="text-[#000]" />
            <span>Change Password</span>
          </Link>
          <Link className="flex items-center gap-4 bg-[#ccebff] hover:bg-black/20 rounded-md my-2 py-2 px-3">
            <RiLogoutBoxRLine className="text-[#000]" />
            <span>Log Out</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
