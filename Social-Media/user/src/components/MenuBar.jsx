import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuName, setMenuName] = useState([]);

  useState(() => {
    setMenuName([
      {
        link: "/",
        icon: FaHome,
        name: "Home",
      },
      {
        link: "/search",
        icon: MdOutlinePersonSearch,
        name: "Search",
      },
      {
        link: "/add-post",
        icon: MdOutlineAddAPhoto,
        name: "Add Post",
      },
      {
        link: "/profile",
        icon: IoMdPerson,
        name: "Profile",
      },
    ]);
  }, []);

  console.log("menuname", menuName);

  return (
    <>
      <div className="fixed bottom-0 lg:top-0 left-0 lg:left-0 w-full lg:w-fit lg:h-[100%] bg-[#DAF5F5] rounded-md shadow-md z-20">
        <div className="flex lg:flex-col lg:gap-4 justify-evenly items-center lg:w-[70%] mx-auto py-2 lg:py-5 px-4 lg:px-3">
          <button>
            <IoMdMenu className="w-7 h-7" />
          </button>
          {menuName.map((items) => {
            return (
              <Link
                to={`${items.link}`}
                className="flex flex-col items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-24 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <FaHome className="w-7 h-7" />
                <p className="text-sm font-semibold whitespace-nowrap">
                  {items.name}
                </p>
              </Link>
            );
          })}
          <Link
            to="/"
            className="flex flex-col items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-24 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <FaHome className="w-7 h-7" />
            <p className="text-sm font-semibold whitespace-nowrap">Home</p>
          </Link>
          <Link
            to="/search"
            className="flex flex-col items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-24 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <MdOutlinePersonSearch className="w-7 h-7" />
            <p className="text-sm font-semibold whitespace-nowrap">Search</p>
          </Link>
          <Link
            to="/add-post"
            className="flex flex-col items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-24 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <MdOutlineAddAPhoto className="w-7 h-7" />
            <p className="text-sm font-semibold whitespace-nowrap">Add Post</p>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-24 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
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
