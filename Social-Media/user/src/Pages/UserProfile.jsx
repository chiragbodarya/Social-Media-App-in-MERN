import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import FollowerBox from "../components/FollowerBox";
import PostBox from "../components/PostBox";
import { UserContext } from "../context/UserContext";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  // console.log("user main page", user);
  return (
    <>
      <Navbar />
      <div className="lg:w-8/12 lg:mx-auto pb-20">
        <FollowerBox />
        <hr className="pt-2" />
        <PostBox user={user} />
        <PostBox user={user} />
      </div>
    </>
  );
};

export default UserProfile;
