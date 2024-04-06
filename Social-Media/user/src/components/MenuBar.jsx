import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";

const MenuBar = () => {
  return (
    <>
      <div className="fixed bottom-0 lg:top-20 left-0 lg:left-5 w-full lg:w-fit lg:h-fit bg-[#DAF5F5] rounded-md shadow-md">
        <div className="flex lg:flex-col lg:gap-2  justify-between items-center lg:w-[70%] mx-auto py-2 lg:py-5 px-4 lg:px-7">
          <Link
            to="/home"
            className="flex flex-col lg:flex-row items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-32 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <FaHome className="w-7 h-7" />
            <p className="text-sm font-semibold whitespace-nowrap">Home</p>
          </Link>
          <Link
            to="/search"
            className="flex flex-col lg:flex-row items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-32 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <MdOutlinePersonSearch className="w-7 h-7" />
            <p className="text-sm font-semibold whitespace-nowrap">Search</p>
          </Link>
          <Link
            to="/add-post"
            className="flex flex-col lg:flex-row items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-32 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <MdOutlineAddAPhoto className="w-7 h-7" />
            <p className="text-sm font-semibold whitespace-nowrap">Add Post</p>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col lg:flex-row items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-32 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <IoMdPerson className="w-7 h-7" />
            <p className="text-sm font-semibold whitespace-nowrap">Profile</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
