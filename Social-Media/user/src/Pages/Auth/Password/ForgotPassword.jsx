import React, { useState } from "react";
import Img from "../../../assets/img/forgot-password.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const handleSubmit = async (values) => {
    const { email } = values;
    
    // console.log("values-only-email", values);
    // console.log("email=========", email);

    try {
      const response = await axios.post("/forgot-password-send-otp", { email });
      // console.log("response", response);
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/verified-otp", { state: { email } });
      } else {
        const errorMessage =
          response.data.error || "email not send!, Please try again.";
        setMessage(errorMessage);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError("the email is not registered with us");
        } else if (error.response.status === 401) {
          setError("Error setting OTP ");
        } else if (error.response.status === 500) {
          setError("the server encountered an error");
        } else {
          setError("this time email not send please try algin leter !", error);
        }
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
              <div className="border-1 border-[#000] rounded-md py-4 px-10 min-w-fit w-full max-w-[500px] mx-auto">
                <p className="text-center text-2xl font-bold">Enter Email</p>
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form action="" className="flex flex-col items-start">
                    <div className="flex flex-col w-full pt-4">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        {message}
                      </p>
                      <p className="text-sm font-semibold text-red-800">
                        {error}
                      </p>
                    </div>
                    <div className="flex flex-col w-full pt-6">
                      <button
                        type="submit"
                        className="bg-blue-400 py-2 rounded-md text-me font-semibold"
                      >
                        Send OTP
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
