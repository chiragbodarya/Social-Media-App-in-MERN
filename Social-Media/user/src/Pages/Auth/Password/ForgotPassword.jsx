import React, { useState } from "react";
import Img from "../../../assets/img/forgot-password.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setEmail({ ...email, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <>
      <div className="flex justify-center items-center w-[100%] h-[100%] min-h-[100vh] overflow-hidden">
        <div className="w-[100%] md:w-[80%] rounded-2xl border-[#000]">
          <div className="flex flex-col md:flex-row justify-center items-center border border-black rounded-lg ">
            <div className="w-[90%] md:w-[50%] flex justify-center items-center">
              <img
                src={Img}
                alt=""
                className="block md-none w-[100%] max-w-[400px]"
              />
            </div>
            <div className="w-[90%] md:w-[50%]">
              <div className="border-1 border-[#000] rounded-md py-4 px-10 min-w-fit w-full max-w-[500px] mx-auto">
                <p className="text-center text-2xl font-bold">Enter Email</p>
                <form
                  action=""
                  className="flex flex-col items-start"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col w-full pt-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email Address"
                      className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      required
                      value={email.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col w-full pt-6">
                    <button
                      type="submit"
                      className="bg-blue-400 py-2 rounded-md text-me font-semibold"
                    >
                      Send Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
