import React, { useEffect, useState } from "react";
import Profile from "../assets/profile-img.png";
import { IoHeart } from "react-icons/io5";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoSend } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostBox = (props) => {
  const { user, postData } = props;
  const token = localStorage.getItem("token");
  const [postMenu, setPostMenu] = useState(false);
  const [like, setLike] = useState();
  const [commentBox, setCommentBox] = useState(false);
  const [newComment, setNewComment] = useState();
  const [allComment, setAllComment] = useState([]);

  useEffect(() => {
    const checkUserAlredyLikePost = async () => {
      try {
        axios
          .post("/check-like-post-status/" + postData._id, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // console.log("check -like -post-statue ----->", response);
            // console.log(
            //   "check -like -post-statue responese.data.isLike ----->",
            //   response.data.isLike
            // );
            setLike(response.data.isLike);
          })
          .catch((error) => {
            console.log("Error : ", error);
          });
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    checkUserAlredyLikePost();
  }, [postData._id]);

  const handleLikePost = async () => {
    if (like === true) {
      // console.log("this is a unlike post");
      // console.log(postData._id);
      try {
        axios
          .post(`/unlike/${postData._id}`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // console.log(response.data.checkUSerAlreadyunLikePost);
            setLike(response.data.checkUSerAlreadyunLikePost);
          })
          .catch((error) => {
            console.log("Error :", error);
          });
      } catch (error) {
        console.log("Error : ", error);
      }
    } else if (like === false) {
      // console.log("this is for the like the post");
      // console.log(postData._id);
      try {
        axios
          .post(`/like/${postData._id}`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // console.log(response);
            // console.log(response.data.message);
            // console.log(response.data.checkUSerAlreadyLikePost);
            setLike(response.data.checkUSerAlreadyLikePost);
          })
          .catch((error) => {
            console.log("error : ", error);
          });
      } catch (error) {
        console.log("Error : ", error);
      }
    } else {
      console.log("user is not deffiend");
    }
  };

  const togglePostMenu = () => {
    setPostMenu(!postMenu);
  };

  const handleDeletePost = async () => {
    // console.log("------------------------------------->>>>>>>>>>>>");
    // console.log("postid", postData._id);
    // console.log(token);
    try {
      axios
        .delete(`/deletepost/${postData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          toast.error("server error !");
        });
    } catch (error) {
      if (response.error.status === 404) {
        toast.error("you can not delete this post !");
      } else if (response.error.status === 401) {
        toast.error("this post is already deleted plase wait !");
      } else if (response.error.status === 500) {
        toast.error("server error !");
      }
      console.log("Error :", error);
    }
  };

  const toggleCommentBox = () => {
    setCommentBox(!commentBox);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    console.log("call add comment function"), console.log(newComment);
    try {
      const response = await axios.post(
        `/comment/${postData._id}`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response.data", response.data);
      console.log("postData", response.data.post);
      setAllComment(response.data.post.comments);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  if (!user) {
    return null;
  }

  let postImage = "";
  if (postData && postData.postImage) {
    postImage = postData.postImage.replace("public\\", "");
  } else {
    console.log("User or post image not found");
  }

  // console.log(postData.likes.length);
  const likes = postData.likes.length;
  console.log(allComment);

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 mx-3 relative">
      <ToastContainer
        autoClose={2000}
        draggable={true}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
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
        <div
          onClick={handleDeletePost}
          className="absolute right-2 border-2 border-[#000] rounded-md py-3 px-3"
        >
          <p>Delete Post</p>
        </div>
      )}
      <div className="w-[100%] max-w-[400px] mx-auto h-[300px] md:h-[400px]">
        <img
          src={`http://localhost:${process.env.BACKEND_PORT}/${postImage}`}
          alt=""
          className="w-[100%] h-[100%]"
        />
      </div>
      <p className="mb-4">{postData.aboutpost}</p>
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-1">
          <IoHeart
            onClick={handleLikePost}
            className={` w-7 h-7 ${like ? "text-red-900 " : "text-[#dcdcdc]"}`}
          />
          <p className="text-sm font-bold">{likes} Likes</p>
        </div>
        <button className="text-gray-500">
          <TfiCommentAlt className="w-5 h-5" onClick={toggleCommentBox} />
        </button>
      </div>
      {commentBox && (
        <>
          <div
            className={`transition-all ease-in-out duration-300 ${
              commentBox ? "h-full" : "h-0"
            }`}
          >
            {allComment.map((item) => {
              return (
                <>
                  <div
                    key={item._id}
                    className="flex items-center justify-between mb-2 pt-2"
                  >
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
                  <p className="py-2">{item.text}</p>
                </>
              );
            })}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Add your comment..."
              className="px-3 py-1 border-2 rounded-lg w-[100%]"
              onChange={handleCommentChange}
            />
            <IoSend
              onClick={handleAddComment}
              className="absolute right-5 bottom-2"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PostBox;
