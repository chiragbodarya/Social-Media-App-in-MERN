import React from "react";
import { FaSearch } from "react-icons/fa";
import Profile from "../assets/profile-img.png";

const Search = () => {
  return (
    <>
      <div className=" bg-[#DAF5F5]">
        <div className="flex justify-between items-center lg:w-[70%] mx-auto py-2 px-4">
          <div className="search-box w-full px-3 relative mx-auto">
            <input
              className="search-input w-full font-montserrat text-base py-2 px-12 bg-[#e6a3a3] text-gray-700 rounded-md border-none transition duration-400 focus:outline-none focus:ring-2 focus:ring-[#000000] placeholder-[#191919]"
              type="text"
              placeholder="Search user name.."
            />
            <button
              className="search-btn bg-transparent text-[#000000] text-lg px-3 py-2 ml-[-45px] border-none transition duration-400 z-10"
              type="submit"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center lg:w-[70%] mx-auto py-2 px-4 pb-[76px]">
        <div className="w-full h-full flex flex-col items-center gap-3">
          <div className="w-full border border-[#000000] rounded-md px-2 py-2 h-10 md:h-14 truncate flex items-center gap-3">
            <img
              src={Profile}
              alt="profile"
              className="w-7 h-7 md:w-7 md:h-7 object-cover rounded-full border border-black"
            />
            <span>UserName</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
