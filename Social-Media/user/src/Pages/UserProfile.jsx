import React from "react";
import Navbar from "../components/Navbar";
import FollowerBox from "../components/FollowerBox";
import PostBox from "../components/PostBox";

const UserProfile = () => {
  return (
    <>
      <Navbar />
      <div className="lg:w-8/12 lg:mx-auto">
        <FollowerBox />
        <hr className="pt-2" />
        <PostBox />
        <PostBox />
      </div>
    </>
  );
};

export default UserProfile;
