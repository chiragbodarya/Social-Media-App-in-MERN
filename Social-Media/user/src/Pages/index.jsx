import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

const index = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center font-bold text-[50px] h-[95vh] pt-[48px]">
        <p>Hello-</p> <br />
        <p>{!!user && <p className="capitalize">{user.username}</p>}</p>
      </div>
    </>
  );
};

export default index;
