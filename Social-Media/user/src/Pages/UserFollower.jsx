import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const UserFollower = () => {
  const { user } = useContext(UserContext);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getFollowersData = async () => {
      try {
        const response = await axios.get(`/followers/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResults(response.data.followersusersData);
        setFilteredResults(response.data.followersusersData);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowersData();
  }, [user.id, token]);

  function convertToLocalhostUrl(localPath) {
    const baseUrl = `http://localhost:${process.env.BACKEND_PORT}/`;
    const forwardSlashesPath = localPath.replace(/public\\/g, "/");
    const localhostUrl = baseUrl + forwardSlashesPath;
    return localhostUrl;
  }

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = results.filter((user) =>
      user.username.toLowerCase().includes(searchValue)
    );
    setFilteredResults(filteredData);
  };

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="bg-[#DAF5F5] fixed w-[100%] z-10 ">
        <div className="flex justify-start gap-5 items-center lg:w-[70%] mx-auto py-2 px-4 ">
          <FaChevronLeft onClick={handleClick} />
          <p className="text-[22px] font-bold">
            <span className="capitalize">{user.username}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center lg:w-[70%] mx-auto py-2 px-4 pb-[76px] lg:pb-5 pt-[70px]">
        <div className="search-box w-full px-3 relative mx-auto">
          <input
            className="search-input w-full font-montserrat text-base py-2 px-12 bg-black/10 text-gray-700 rounded-md border-none transition duration-400 focus:outline-none focus:ring-2 focus:ring-[#000000] placeholder-[#191919]"
            type="text"
            placeholder="Search user name.."
            onChange={handleSearch}
          />
          <button
            className="search-btn bg-transparent text-[#000000] text-lg px-3 py-2 ml-[-45px] border-none transition duration-400 z-10"
            type="submit"
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start lg:w-[70%] mx-auto py-2 px-4 pb-[76px] lg:pb-5 min-h-[100vh]">
        <div className="w-full h-full flex flex-col items-center gap-3">
          {filteredResults.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user._id)}
              className="w-full border border-[#000000] rounded-md px-2 py-2 h-10 md:h-14 truncate flex items-center gap-3 cursor-pointer"
            >
              <img
                src={convertToLocalhostUrl(user.profileImg)}
                alt="profile"
                className="w-7 h-7 md:w-7 md:h-7 object-cover rounded-full border border-black"
              />
              <span>{user.username}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserFollower;
