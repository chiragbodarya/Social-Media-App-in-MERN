import React, { useState } from "react";
import Img from "../../../assets/img/verified-code.png";
import OtpInput from "react-otp-input";
import "../../../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifiedOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const data = useLocation();
  // console.log("data", data);
  const [email, setEmail] = useState(data.state.email);

  if (!email)
    return setError("No Email Provided! Please go back and try again.");
  // console.log("email", email);
  // console.log("otp", otp);

  const handleOtp = (otpNUmber) => {
    setOtp(otpNUmber);
  };

  const handleSubmitOtp = async (event) => {
    event.preventDefault();
    // console.log("email ---->", email, "otp---->", otp);
    try {
      const response = await axios.post("/forgot-password-verified-otp", {
        email,
        otp,
      });
      // console.log("response-in verifed otp page", response);
      if (response.status === 200) {
        setMessage(response.data.msg);
        navigate("/reset-password", { state: { email } });
      } else {
        const errorMessage =
          response.data.error || "Login failed. Please try again.";
        setMessage(errorMessage);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("please provide all fields");
        } else if (error.response.status === 401) {
          setError("the otp is not match !");
        } else if (error.response.status === 500) {
          setError("this otp is not verified");
        } else {
          setError("server error please try algin leter !", error);
        }
      } else {
        console.error("Error sending request:", error);
      }
    }
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
              <div className="border-1 border-[#000] rounded-md py-4 px-5 md:px-7 lg:px-10 min-w-fit w-full max-w-[500px] mx-auto">
                <p className="text-center text-2xl font-bold">Enter OTP</p>
                <form
                  onSubmit={handleSubmitOtp}
                  className="flex flex-col items-start"
                >
                  <div className="flex flex-col w-full pt-4">
                    <OtpInput
                      value={otp}
                      onChange={handleOtp}
                      numInputs={6}
                      inputType="number"
                      renderInput={(props) => <input {...props} />}
                      containerStyle={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        padding: "0px 20px",
                      }}
                      inputStyle={{
                        WebkitAppearance: "none",
                        margin: "0px",
                        width: "15%",
                        maxWidth: "50px",
                        height: "50px",
                        maxHeight: "50px",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                      focusStyle={{
                        borderRadius: 20,
                        border: `2px solid blue`,
                        outline: "none",
                      }}
                    />
                  </div>
                  <p className="text-sm font-semibold text-green-800 text-center">
                    {message}
                  </p>
                  <p className="text-sm font-semibold text-red-800">{error}</p>
                  <div className="flex flex-col w-full pt-6">
                    <button
                      type="submit"
                      className="bg-blue-400 py-2 rounded-md text-me font-semibold"
                    >
                      Verified OTP
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

export default VerifiedOtp;
