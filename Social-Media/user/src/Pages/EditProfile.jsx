import React, { useContext, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Profile from "../assets/profile-img.png";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const EditProfile = () => {
  const { user } = useContext(UserContext);
  // console.log("user", user);
  const [userData, setUserData] = useState(user);
  // console.log("userData", userData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const MAX_FILE_SIZE = 502400;

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
    profileImg: Yup.mixed()
      .test(
        "fileSize",
        "Max allowed size is 500KB",
        (value) => value && value.size <= MAX_FILE_SIZE
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    aboutUs: Yup.string().max(100, "maximum 100 characters"),
  });

  const handleUpdateProfile = (values) => {
    const { firstname, lastname, username, email, profileImg, aboutUs } =
      values;
    // console.log("Form values:", values);
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("aboutUs", aboutUs);

    // Iterate over FormData entries
    // for (const entry of formData.entries()) {
    //   console.log(entry);
    // }

    // console.log("formData", formData);
    // console.log("profileImg", profileImg);

    try {
      axios
        .put("/update-profile/" + userData.id, formData)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          setError("Error updating profile:", error);
        });
      // const updatedUserData = response.data;
      // setUserData(updatedUserData);
      setMessage("Profile updated successfully");
    } catch (error) {
      if (error.response.status === 404) {
        setError("User not found");
      }
      if (error.response.status === 500) {
        setError("Internal server error");
      }
      setError("error", error);
    }
  };
  // console.log("user", user);
  // console.log("userData", userData);

  let ProfileImag = "";

  if (userData && userData.profileImg) {
    ProfileImag = userData.profileImg.replace("public\\", "");
    // console.log("ProfileImag", ProfileImag);
    // const Pimg = `http://localhost:5000/${ProfileImag}`;
    // console.log("Pimg", Pimg);
  } else {
    console.log("not found the user profile Image");
  }

  return (
    <div className="flex justify-center items-center h-screen pb-[76px]">
      <div className="w-full max-w-md">
        <p className="text-green-800 font-bold text-center">
          {!message ? "" : message}
        </p>
        <p className="text-red-800 font-bold text-center">
          {!error ? "" : error}
        </p>
        <Formik
          initialValues={{
            firstname: userData.firstname || "",
            lastname: userData.lastname || "",
            username: userData.username || "",
            email: userData.email || "",
            profileImg: userData.profileImg || Profile,
            aboutUs: userData.aboutUs || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}
        > 
          <Form className="flex flex-col items-center">
            <Field name="profileImg">
              {({ field, form }) => (
                <div className="flex flex-col items-center w-full pt-4">
                  <img
                    src={
                      field.value instanceof File
                        ? URL.createObjectURL(field.value)
                        : ProfileImag
                        ? `http://localhost:${process.env.BACKEND_PORT}/${ProfileImag}`
                        : Profile
                    }
                    alt="profile"
                    className="w-40 h-40 object-cover border border-black"
                  />
                  <input
                    type="file"
                    id="profileImg"
                    name="profileImg"
                    className="bg-black/20 my-3 py-1 px-3 rounded-md border border-black text-center flex items-center gap-3 w-full max-w-52"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      form.setFieldValue("profileImg", file);
                    }}
                  />
                  <ErrorMessage
                    name="profileImg"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}
            </Field>
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
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col w-full pt-4">
              <label name="email" className="text-lg font-semibold">
                About us
              </label>
              <Field
                type="text"
                id="aboutUs"
                name="aboutUs"
                placeholder="Add something About you"
                className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
              />
              <ErrorMessage
                name="aboutUs"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col w-full pt-6 max-w-52 mx-auto">
              <button
                type="submit"
                className="bg-blue-400 py-2 rounded-md text-me font-semibold"
              >
                Update
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
