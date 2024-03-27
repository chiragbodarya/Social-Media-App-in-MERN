import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Img from "../../../assets/img/registration.png";
import * as Yup from "yup";

const index = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .max(15, "must be 15 characters or less")
      .required("Required"),
    lastname: Yup.string()
      .max(15, "must be 15 characters or less")
      .required("Required"),
    username: Yup.string()
      .max(15, "must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be 8 characters or more")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const register = async (newUser) => {
    const { firstname, lastname, username, email, password, confirmpassword } =
      newUser;
    // console.log(newUser);
    try {
      const newUser = await axios.post("/registration", {
        firstname,
        lastname,
        username,
        email,
        password,
        confirmpassword,
      });
      console.log("newUser", newUser);
      try {
        if (newUser.error) {
          alert(newUser.error);
        } else {
          alert("registeer successful!");
          navigate("/login");
        }
      } catch (error) {
        console.log("newUser", error);
      }
    } catch (error) {
      alert(error, "Error not creating account!");
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
                <p className="text-center text-2xl font-bold">Registration</p>
                <Formik
                  initialValues={{
                    firstname: "",
                    lastname: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmpassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={register}
                >
                  <Form className="flex flex-col items-start">
                    <div className="flex flex-col w-full pt-4">
                      <label name="firstname" className="text-lg font-semibold">
                        First Name
                      </label>
                      <Field
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="Enter First Name"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                        // value={values.firstname}
                        // onChange={formik.handleChange}
                      />
                      <ErrorMessage
                        name="firstname"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col w-full pt-4">
                      <label name="lastname" className="text-lg font-semibold">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Enter Last Name"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                        // value={values.lastname}
                        // onChange={formik.handleChange}
                      />
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col w-full pt-4">
                      <label name="username" className="text-lg font-semibold">
                        User Name
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter User Name"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                        // value={values.username}
                        // onChange={formik.handleChange}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col w-full pt-4">
                      <label name="email" className="text-lg font-semibold">
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email Address"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                        // value={values.email}
                        // onChange={formik.handleChange}
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
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                        // value={values.password}
                        // onChange={formik.handleChange}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col w-full pt-4">
                      <label
                        name="confirmpassword"
                        className="text-lg font-semibold"
                      >
                        Re-Enter Password
                      </label>
                      <Field
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword"
                        placeholder="Re-Enter Password"
                        className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                        // value={values.confirmpassword}
                        // onChange={formik.handleChange}
                      />
                      <ErrorMessage
                        name="confirmpassword"
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

export default index;
