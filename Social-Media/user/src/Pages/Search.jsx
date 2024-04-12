import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchImage from "../assets/img/search.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [results, setResult] = useState([]);

  const searchUser = (e) => {
    axios
      .get("/search-user?query=" + e.target.value)
      .then((response) => {
        // console.log(response.data);
        setResult(response.data);
      })
      .catch((error) => {
        console.error("Error searching users:", error);
        // Handle error (e.g., show error message to the user)
      });
  };

  function convertToLocalhostUrl(localPath) {
    const baseUrl = `http://localhost:${process.env.BACKEND_PORT}/`;
    const forwardSlashesPath = localPath.replace(/public\\/g, "/");
    const localhostUrl = baseUrl + forwardSlashesPath;
    return localhostUrl;
  }

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
    // console.log("userId", userId);
  };

  // console.log(results);
  return (
    <>
      <div className=" bg-[#DAF5F5] fixed w-[100%] z-10 ">
        <div className="flex justify-between items-center lg:w-[70%] mx-auto py-2 px-4">
          <div className="search-box w-full px-3 relative mx-auto">
            <input
              className="search-input w-full font-montserrat text-base py-2 px-12 bg-[#e6a3a3] text-gray-700 rounded-md border-none transition duration-400 focus:outline-none focus:ring-2 focus:ring-[#000000] placeholder-[#191919]"
              type="text"
              placeholder="Search user name.."
              onChange={searchUser}
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
      {results.length > 0 ? (
        <div className="flex justify-between items-start lg:w-[70%] mx-auto py-2 px-4 pb-[76px] lg:pb-5 pt-[70px] min-h-[100vh]">
          <div className="w-full h-full flex flex-col items-center gap-3">
            {results.map((user) => {
              return (
                <div
                  key={user._id}
                  onClick={() => handleUserClick(user._id)}
                  className="w-full border border-[#000000] rounded-md px-2 py-2 h-10 md:h-14 truncate flex items-center gap-3"
                >
                  <img
                    src={convertToLocalhostUrl(user.profileImg)}
                    alt="profile"
                    className="w-7 h-7 md:w-7 md:h-7 object-cover rounded-full border border-black"
                  />
                  <span>{user.username}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center lg:w-[70%] mx-auto py-2 px-4 pb-[76px]">
          <img src={SearchImage} alt="Loding..." />
        </div>
      )}
    </>
  );
};

export default Search;
