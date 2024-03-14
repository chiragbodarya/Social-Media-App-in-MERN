import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../../../assets/img/login.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const index = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const login = async (values) => {
    const { email, password } = values;
    // console.log("email:", email);
    // console.log("password:", password);
    try {
      const oldUser = await axios.post("/login", {
        email,
        password,
      });
      // console.log("oldUser", oldUser);
      if (oldUser.data.error) {
        alert(oldUser.data.error);
      } else {
        alert(oldUser.data.message);
        navigate("/");
      }
    } catch (error) {
      alert.error("Login failed. Please try again.");
      alert("");
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
              <div className="border-1 border-[#000] rounded-md py-4 px-10 min-w-fit w-full max-w-[500px] mx-auto">
                <p className="text-center text-2xl font-bold">Login</p>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={login}
                >
                  <Form action="" className="flex flex-col items-start">
                    <div className="flex flex-col w-full pt-4">
                      <label name="email" className="text-lg font-semibold">
                        Email
                      </label>
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
                    <div className="flex flex-col w-full pt-4">
                      <label name="password" className="text-lg font-semibold">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col w-full pt-6">
                      <button
                        type="submit"
                        className="bg-blue-400 py-2 rounded-md text-me font-semibold"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Formik>
                <div className="flex justify-between">
                  <Link to="/registration" className="text-blue-800">
                    Creat a new Account !
                  </Link>
                  <Link to="/forgot-password" className="text-blue-800">
                    Forgot Password !
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
