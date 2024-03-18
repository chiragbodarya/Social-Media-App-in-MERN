import React, { useState } from "react";
import Img from "../../../assets/img/login-img.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const validationSchema = Yup.object({
    old_password: Yup.string()
      .required("Required")
      .min(8, "Must be 8 characters or more")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
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

  const hendleChangePassword = () => {
    console.log("password is change");
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
                    old_password: "",
                    new_password: "",
                    new_confirmpassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={hendleChangePassword}
                >
                  <Form
                    // action=""
                    className="flex flex-col items-start"
                    // onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col w-full pt-4">
                      <label
                        name="old_password"
                        className="text-lg font-semibold"
                      >
                        Old Password
                      </label>
                      <Field
                        type="password"
                        name="old_password"
                        placeholder="Enter old-password"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                      />
                      <ErrorMessage
                        name="old_password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
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
                <Link to="/forgot-password" className="text-blue-800">
                  Forgot Password !
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
