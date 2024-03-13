import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { Formik, useFormik } from "formik";
import Img from "../../../assets/img/registration.png";

const validate = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "required";
  } else if (values.firstname.length > 15) {
    errors.firstname = "must be 15 characters or less";
  }

  if (!values.lastname) {
    errors.lastname = "required";
  } else if (values.lastname.length > 15) {
    errors.lastname = "must be 15 characters or less";
  }

  if (!values.username) {
    errors.username = "required";
  } else if (values.username.length > 15) {
    errors.username = "must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password is required 8 characters";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Password is required one uppercase";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Password is required one uppercase";
  } else if (!/\d/.test(values.password)) {
    errors.password = "Password is required one digit";
  }

  if (!values.confirmpassword) {
    errors.confirmpassword = "required";
  } else if (values.password !== values.confirmpassword) {
    errors.confirmpassword = "Passwords do not match";
  }
  return errors;
};

const formik = () => {
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  // const register = async () => {
  //   const { firstname, lastname, username, email, password, confirmpassword } =
  //     newUser;
  //   try {
  //     if (password !== confirmpassword) {
  //       alert("password and confirm password in not match");
  //     } else {
  //       const newUser = await axios.post("/registration", {
  //         firstname,
  //         lastname,
  //         username,
  //         email,
  //         password,
  //         confirmpassword,
  //       });
  //       try {
  //         if (newUser.error) {
  //           alert(newUser.error);
  //         } else {
  //           // setNewUser({});
  //           alert("registeer successful!");
  //         }
  //       } catch (error) {
  //         console.log("newUser", error);
  //       }
  //     }
  //   } catch (error) {
  //     alert(error, "Error not creating account!");
  //   }
  // };

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
                <p className="text-center text-2xl font-bold">Registration</p>

                <form
                  action=""
                  className="flex flex-col items-start"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="flex flex-col w-full pt-4">
                    <label name="firstname" className="text-lg font-semibold">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Enter First Name"
                      className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <div className="text-red-600 text-sm font-semibold">
                        {formik.errors.firstname}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full pt-4">
                    <label name="lastname" className="text-lg font-semibold">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Enter Last Name"
                      className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lastname ? (
                      <div className="text-red-600 text-sm font-semibold">
                        {formik.errors.lastname}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full pt-4">
                    <label name="username" className="text-lg font-semibold">
                      User Name
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter User Name"
                      className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.username ? (
                      <div className="text-red-600 text-sm font-semibold">
                        {formik.errors.username}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full pt-4">
                    <label name="email" className="text-lg font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email Address"
                      className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email ? (
                      <div className="text-red-600 text-sm font-semibold">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full pt-4">
                    <label name="password" className="text-lg font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password ? (
                      <div className="text-red-600 text-sm font-semibold">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col w-full pt-4">
                    <label
                      name="confirmpassword"
                      className="text-lg font-semibold"
                    >
                      Re-Enter Password
                    </label>
                    <input
                      type="password"
                      name="confirmpassword"
                      placeholder="Re-Enter Password"
                      className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      value={formik.values.confirmpassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.confirmpassword ? (
                      <div className="text-red-600 text-sm font-semibold">
                        {formik.errors.confirmpassword}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col w-full pt-6">
                    <button
                      type="submit"
                      className="bg-blue-400 py-2 rounded-md text-me font-semibold"
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <p>
                  I have already an account!
                  <Link to="/login" className="text-blue-800">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default formik;
