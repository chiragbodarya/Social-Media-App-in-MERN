import React from "react";
import FollowerBox from "../components/FollowerBox";
import Navbar from "../components/Navbar";
import PostBox from "../components/PostBox";

const index = () => {
  return (
    <>
      <div className="lg:w-8/12 lg:mx-auto">
        <Navbar />
        <hr className="pt-2" />
        <FollowerBox />
        <hr className="pt-2" />
        <PostBox />
        <PostBox />
      </div>
    </>
  );
};

export default index;
