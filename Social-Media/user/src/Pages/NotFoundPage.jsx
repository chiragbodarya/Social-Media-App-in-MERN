import React, { useEffect } from "react";
import Img from "../assets/img/404.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFoundPage = () => {
  const userData = useSelector((state) => state.users);
  console.log(userData);
  useEffect(() => {
    console.log("userData", userData);
  }, []);
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="text-center">
          <img src={Img} alt="" />
          <Link
            to="/"
            className="bg-blue-400 px-7 py-3 rounded-md cursor-pointer"
          >
            Go To Home
          </Link>
          {userData?.user?.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
