import React, { useState } from "react";
import Img from "../../../assets/img/login-img.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const validationSchema = Yup.object({
    new_password: Yup.string()
      .required("Required")
      .min(8, "Must be 8 characters or more")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    new_confirmpassword: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Required"),
  });

  const data = useLocation();
  // console.log("data", data);
  const [email, setEmail] = useState(data.state.email);

  const handleResetPassword = async (value) => {
    // console.log("email", email);
    const { new_password, new_confirmpassword } = value;
    // console.log("new_password", new_password);
    // console.log("new_confirmpassword", new_confirmpassword);

    try {
      if (!new_password || !new_confirmpassword) {
        setError("Fields are empty");
      } else if (new_password !== new_confirmpassword) {
        setError("Passwords do not match");
      }
      const response = await axios.post("/reset-password", {
        email,
        new_password,
        new_confirmpassword,
      });
      if (response.status === 200) {
        setMessage("password is updated");
        navigate("/");
      } else {
        setError("Server error!");
      }
      console.log("response", response);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError("confirm password is not match");
        } else if (error.response.status === 404) {
          setError("this email is not register");
        } else if (error.response.status === 500) {
          setError("Server Error!");
        } else {
          setError("Something went wrong on the server.");
        }
      } else {
        console.error("not update password", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-[100%] h-[100%] min-h-[100vh] overflow-hidden">
        <div className="w-[100%] md:w-[80%] rounded-2xl border-[#000]">
          <div className="flex flex-col md:flex-row justify-center items-center border border-black rounded-lg">
            <div className="w-[90%] md:w-[50%] flex justify-center items-center">
              <img
                src={Img}
                alt=""
                className="block md-none w-[100%] max-w-[400px]"
              />
            </div>
            <div className="w-[90%] md:w-[50%]">
              <div className="border-1 border-[#000] rounded-md py-4 px-10  min-w-fit w-full max-w-[500px] mx-auto">
                <p className="text-center text-2xl font-bold">
                  Change Password
                </p>
                <Formik
                  initialValues={{
                    newPassword: "",
                    new_confirmpassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleResetPassword}
                >
                  <Form action="" className="flex flex-col items-start">
                    <div className="flex flex-col w-full pt-4">
                      <label
                        name="new_password"
                        className="text-lg font-semibold"
                      >
                        New Password
                      </label>
                      <Field
                        type="password"
                        name="new_password"
                        placeholder="Enter new-password"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      />
                      <ErrorMessage
                        name="new_password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col w-full pt-4">
                      <label
                        name="new_confirmpassword"
                        className="text-lg font-semibold"
                      >
                        Re-Enter New Password
                      </label>
                      <Field
                        type="password"
                        name="new_confirmpassword"
                        placeholder="Re-Enter new-Password"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      />
                      <ErrorMessage
                        name="new_confirmpassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <p className="text-sm font-semibold text-green-800">
                      {message}
                    </p>
                    <p className="text-sm font-semibold text-red-800">
                      {error}
                    </p>
                    <div className="flex flex-col w-full pt-6">
                      <button
                        type="submit"
                        className="bg-blue-400 py-2 rounded-md text-me font-semibold"
                      >
                        Change Password
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

export default ResetPassword;
