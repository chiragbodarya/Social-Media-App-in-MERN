import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
// import axios from "axios";

const FollowerBox = () => {
  const { user } = useContext(UserContext);

  let followers = "";
  let following = "";
  if (user && user.followers) {
    followers = user.followers.length;
    following = user.following.length;
    console.log("followers:", followers);
    console.log("following:", following);
  }

  // const folloeUser = (userId) => {
  //   axios.put("/follow");
  // };

  return (
    <div>
      <main className="bg-gray-100 bg-opacity-25">
        <header className="flex flex-wrap items-center justify-between py-4 px-2 md:py-8 ">
          <div className="w-[30%] md:w-[50%] flex justify-center items-center">
            <img
              src={`http://localhost:${process.env.BACKEND_PORT}/${user.profileImg}`}
              alt="profile"
              className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-black p-1"
            />
          </div>

          <div className="w-[67%] md:w-[50%]">
            <div className="md:flex md:flex-wrap md:items-center md:mb-4 text-center md:text-start">
              <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                <span className="capitalize">{user.username}</span>
              </h2>
            </div>

            <ul className="flex justify-center md:justify-start space-x-4 md:space-x-8 mb-2 md:mb-4">
              <li className="flex flex-col md:flex-row items-center">
                <span className="font-semibold text-[14px] md:text-[20px]">
                  136
                </span>
                <span className="text-[12px] md:text-[16px]">posts</span>
              </li>
              <li className="flex flex-col md:flex-row items-center">
                <span className="font-semibold text-[14px] md:text-[20px]">
                  {followers}
                </span>
                <span className="text-[12px] md:text-[16px]">followers</span>
              </li>
              <li className="flex flex-col md:flex-row items-center">
                <span className="font-semibold text-[14px] md:text-[20px]">
                  {following}
                </span>
                <span className="text-[12px] md:text-[16px]">following</span>
              </li>
            </ul>

            <div className="hidden md:block pb-2 text-start">
              <h1 className="font-semibold">
                <span className="capitalize">{user.firstname}</span>
              </h1>
              <p>{user.aboutUs}</p>
            </div>
            <button className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block block w-full max-w-[300px] mx-auto">
              Follow
            </button>
          </div>
        </header>
        <div className="md:hidden text-sm my-2 px-3 py-2">
          <h1 className="font-semibold">
            <span className="capitalize">{user.firstname}</span>
          </h1>
          <p>{user.aboutUs}</p>
        </div>
      </main>
    </div>
  );
};

export default FollowerBox;
