import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlinePersonSearch, MdOutlineAddAPhoto } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoMdPerson, IoMdMenu } from "react-icons/io";
import { TbMessage } from "react-icons/tb";

const MenuBar = () => {
  const [menuName, setMenuName] = useState([]);

  useState(() => {
    setMenuName([
      {
        id: 1,
        link: "/",
        icon: FaHome,
        name: "Home",
      },
      {
        id: 2,
        link: "/search",
        icon: MdOutlinePersonSearch,
        name: "Search",
      },
      {
        id: 3,
        link: "/message",
        icon: TbMessage,
        name: "Message",
      },
      {
        id: 4,
        link: "/add-post",
        icon: MdOutlineAddAPhoto,
        name: "Add Post",
      },
      {
        id: 5,
        link: "/profile",
        icon: IoMdPerson,
        name: "Profile",
      },
    ]);
  }, []);

  return (
    <>
      <div className="fixed bottom-0 lg:top-0 left-0 lg:left-0 w-[100%] lg:w-[120px] lg:h-[100%] bg-[#DAF5F5] rounded-md shadow-md z-20 ">
        <div className="flex lg:flex-col lg:gap-4 justify-evenly items-center lg:w-[70%] mx-auto py-2 lg:py-5 px-4 lg:px-3">
          {menuName.map((items) => {
            return (
              <Link
                key={items.id}
                to={`${items.link}`}
                className="flex flex-col items-center px-2 lg:px-5 py-1 border-2 border-[#85e0e0] rounded-[5px] lg:w-24 shadow-md transition transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                {React.createElement(items.icon, { className: "w-7 h-7" })}
                <p className="text-sm font-semibold whitespace-nowrap">
                  {items.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MenuBar;
