import React, { useContext } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UserFollowing = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="bg-[#DAF5F5]">
        <div className="flex justify-start gap-5 items-center lg:w-[70%] mx-auto py-2 px-4 ">
          <FaChevronLeft onClick={handleClick} />
          <p className="text-[22px] font-bold">
            <span className="capitalize">{user.username}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center lg:w-[70%] mx-auto py-2 px-4">
        <div className="search-box w-full px-3 relative mx-auto">
          <input
            className="search-input w-full font-montserrat text-base py-2 px-12 bg-black/10 text-gray-700 rounded-md border-none transition duration-400 focus:outline-none focus:ring-2 focus:ring-[#000000] placeholder-[#191919]"
            type="text"
            placeholder="Search user name.."
            //   onChange={searchUser}
          />
          <button
            className="search-btn bg-transparent text-[#000000] text-lg px-3 py-2 ml-[-45px] border-none transition duration-400 z-10"
            type="submit"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </>
  );
};

export default UserFollowing;
