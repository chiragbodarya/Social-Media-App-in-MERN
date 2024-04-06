import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FollowerBox from "../components/FollowerBox";
import PostBox from "../components/PostBox";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  // console.log("user main page", user);
  // console.log("user id is the", user.id);
  // console.log("user", user);
  const [postData, setPostData] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (user.id) {
          const response = await axios.post("/getallpost/" + user.id);
          setPostData(response.data.userPosts);
        } else {
          console.log("User ID is not available");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [user.id]);

  return (
    <>
      <Navbar />
      <div className="lg:w-8/12 lg:mx-auto pb-20 pb-[76px] lg:pb-5 pt-[48px]">
        <FollowerBox />
        <hr className="pt-2" />
        {postData &&
          postData.map((post, index) => (
            <div key={index}>
              <PostBox user={user} postData={post} />
            </div>
          ))}
      </div>
    </>
  );
};

export default UserProfile;
