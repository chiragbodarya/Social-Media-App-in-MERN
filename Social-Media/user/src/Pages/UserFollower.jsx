import React, { useContext, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
// import axios from "axios";

const UserFollower = () => {
  const { user } = useContext(UserContext);
  // const [results, setResult] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  // if (user) {
  //   console.log(user);
  //   console.log("user.follower", user.followers);
  //   setResult(user.followers);
  //   console.log("results", results);
  // }
  // const searchUser = (e) => {
  //   console.log(e.target.value);
  //   // axios
  //   //   .get("/search-user?query=" + e.target.value)
  //   //   .then((response) => {
  //   //     // console.log(response.data);
  //   //     setResult(response.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error searching users:", error);
  //   //     // Handle error (e.g., show error message to the user)
  //   //   });
  // };

  // const handleUserClick = (userId) => {
  //   navigate(`/user/${userId}`);
  //   // console.log("userId", userId);
  // };

  // function convertToLocalhostUrl(localPath) {
  //   const baseUrl = "http://localhost:5000/";
  //   const forwardSlashesPath = localPath.replace(/public\\/g, "/");
  //   const localhostUrl = baseUrl + forwardSlashesPath;
  //   return localhostUrl;
  // }

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
            // onChange={searchUser}
          />
          <button
            className="search-btn bg-transparent text-[#000000] text-lg px-3 py-2 ml-[-45px] border-none transition duration-400 z-10"
            type="submit"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* <div className="flex justify-between items-center lg:w-[70%] mx-auto py-2 px-4 pb-[76px]">
        <div className="w-full h-full flex flex-col items-center gap-3">
          {results.map((user) => {
            return (
              <div
                key={user}
                // onClick={() => handleUserClick(user._id)}
                className="w-full border border-[#000000] rounded-md px-2 py-2 h-10 md:h-14 truncate flex items-center gap-3"
              >
                <img
                  src={convertToLocalhostUrl(user.profileImg)}
                  alt="profile"
                  className="w-7 h-7 md:w-7 md:h-7 object-cover rounded-full border border-black"
                /> 
                <span>sasjdn</span>
              </div>
            );
          })}   
        </div>
      </div> */}
    </>
  );
};

export default UserFollower;
