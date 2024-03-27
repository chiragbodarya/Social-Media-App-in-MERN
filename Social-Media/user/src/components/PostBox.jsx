import React, { useContext, useState } from "react";
import Profile from "../assets/profile-img.png";
import { IoHeart } from "react-icons/io5";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoSend } from "react-icons/io5";
import { UserContext } from "../context/UserContext";

const PostBox = () => {
   const { user } = useContext(UserContext);
  const [comment, setComment] = useState(false);

  const toggleComment = () => {
    setComment(!comment);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="rounded-full h-8 w-8 bg-gray-400 mr-2">
          <img
            src={`http://localhost:${process.env.BACKEND_PORT}/${user.profileImg}`}
            alt="profile"
            className="object-cover rounded-full "
          />
        </div>
        <span className="font-bold">
          {!!user && <span className="capitalize">{user.username}</span>}
        </span>
      </div>
      <div className="w-[100%] max-w-[400px] mx-auto h-[300px] md:h-[400px]">
        <img src={Profile} alt="" className="w-[100%] h-[100%]" />
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
          <div>
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
