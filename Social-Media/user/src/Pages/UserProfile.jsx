import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FollowerBox from "../components/FollowerBox";
import PostBox from "../components/PostBox";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  console.log("user main page", user);
  console.log("user id is the", user.id);
  console.log(user);
  const [postData, setPostData] = useState();

  useEffect(() => {
    setTimeout(async () => {
      try {
        if (user.id) {
          const response = await axios.post("/getallpost/" + user.id);
          setPostData(response.data.userPosts);
          console.log("All posts:", response.data.userPosts);
          console.log("All posts:", postData);
        } else {
          console.log("User ID is not available");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }, 100);
  }, [user.id]);
  if (postData) {
    console.log("postData this data is the post box 00000000000000", postData);
    const image = postData[0].postImage;
    console.log("postImage", image);
  }

  return (
    <>
      <Navbar />
      <div className="lg:w-8/12 lg:mx-auto pb-20">
        <FollowerBox />
        <hr className="pt-2" />
        <PostBox user={user} postData={postData} />
      </div>
    </>
  );
};

export default UserProfile;
