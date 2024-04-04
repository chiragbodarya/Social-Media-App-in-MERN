import React, { useEffect, useState } from "react";
import Profile from "../assets/profile-img.png";
import { IoHeart } from "react-icons/io5";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoSend } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const PostBox = (props) => {
  const [comment, setComment] = useState(false);
  const [postMenu, setPostMenu] = useState(false);
  const [user, setUser] = useState();
  const [postData, setPostData] = useState();

  useEffect(() => {
    setUser(props.user);
    setPostData(props.postData);
  }, [props.user, props.postData]);

  console.log("postData this data is the post box", postData);
  // console.log("postiage", postData.postImage);

  const toggleComment = () => {
    setComment(!comment);
  };

  const togglePostMenu = () => {
    setPostMenu(!postMenu);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 mx-3 relative">
      <div className="flex justify-between items-center px-3">
        <div className="flex items-center mb-2">
          <div className="rounded-full h-8 w-8 bg-gray-400 mr-2">
            <img
              src={`http://localhost:${process.env.BACKEND_PORT}/${user.profileImg}`}
              alt="profile"
              className="object-cover rounded-full "
            />
          </div>
          <span className="font-bold">
            <span className="capitalize">{user.username}</span>
          </span>
        </div>
        <BsThreeDotsVertical onClick={togglePostMenu} />
      </div>
      {postMenu && (
        <div className="absolute right-2 border-2 border-[#000] rounded-md py-3 px-3">
          <p>Delete Post</p>
        </div>
      )}
      <div className="w-[100%] max-w-[400px] mx-auto h-[300px] md:h-[400px]">
        <img
          src={`http://localhost:${process.env.BACKEND_PORT}/${user.profileImg}`}
          alt=""
          className="w-[100%] h-[100%]"
        />
      </div>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis
        lectus.
      </p>
      <div className="flex gap-5 items-center">
        <button>
          <IoHeart className="text-[#ff0000] w-7 h-7" />
        </button>
        <button className="text-gray-500">
          <TfiCommentAlt className="w-5 h-5" onClick={toggleComment} />
        </button>
      </div>
      {comment && (
        <>
          <div
            className={`transition-all ease-in-out duration-300 ${
              comment ? "h-full" : "h-0"
            }`}
          >
            <div className="flex items-center justify-between mb-2 pt-2">
              <div className="flex items-center">
                <div className="rounded-full h-8 w-8 bg-gray-400 mr-2">
                  <img
                    src={Profile}
                    alt="profile"
                    className="object-cover rounded-full "
                  />
                </div>
                <span className="font-bold">John Doe</span>
              </div>
              <button>
                <IoHeart className="text-[#ff0000] w-4 h-4" />
              </button>
            </div>
            <p className="py-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
              delectus ad quasi dolorem ex a rerum excepturi est magni placeat.
            </p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Add your comment..."
              className="px-3 py-1 border-2 rounded-lg w-[100%]"
            />
            <IoSend className="absolute right-5 bottom-2" />
          </div>
        </>
      )}
    </div>
  );
};

export default PostBox;
