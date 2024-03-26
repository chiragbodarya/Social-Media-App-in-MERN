import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

const MenuBar = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-[#DAF5F5]">
        <div className="flex justify-between items-center lg:w-[70%] mx-auto py-2 px-4">
          <Link
            to="/home"
            className="flex flex-col items-center px-5 py-1 border-2 border-[#85e0e0] rounded-[5px]"
          >
            <FaHome className="w-7 h-7" />
            <p className="text-sm font-semibold">Home</p>
          </Link>
          <Link
            to="/search"
            className="flex flex-col items-center px-5 py-1 border-2 border-[#85e0e0] rounded-[5px]"
          >
            <MdOutlinePersonSearch className="w-7 h-7" />
            <p className="text-sm font-semibold">Search</p>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center px-5 py-1 border-2 border-[#85e0e0] rounded-[5px]"
          >
            <IoMdPerson className="w-7 h-7" />
            <p className="text-sm font-semibold">Profile</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
