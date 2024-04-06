import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Profile from "../assets/profile-img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 502400;

  const validationSchema = Yup.object({
    postImage: Yup.mixed()
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
    aboutpost: Yup.string().max(100, "maximum 100 characters"),
  });

  const handleUpdateProfile = (values) => {
    try {
      const { postImage, aboutpost } = values;
      // console.log("Form values:", values);
      const formData = new FormData();
      formData.append("postImage", postImage);
      formData.append("aboutpost", aboutpost);
      // for (const entry of formData.entries()) {
      //   console.log(entry);
      // }

      const token = localStorage.getItem("token");
      axios
        .post("/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setMessage(response.message);
          setMessage("upload post successfuly");
          navigate("/profile");
        })
        .catch((error) => {
          setError("Error updating profile", error);
          console.log(error);
        });
    } catch (error) {
      setError(error.response);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen px-5 pb-[76px] lg:pb-5 pt-[48px]">
        <div className="w-full max-w-md">
          <p className="text-green-800 font-bold text-center">
            {!message ? "" : message}
          </p>
          <p className="text-red-800 font-bold text-center">
            {!error ? "" : error}
          </p>
          <Formik
            initialValues={{
              postImage: Profile,
              aboutpost: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleUpdateProfile}
          >
            <Form className="flex flex-col items-center">
              <Field name="postImage">
                {({ field, form }) => (
                  <div className="flex flex-col items-center w-full pt-4">
                    <img
                      src={
                        field.value instanceof File
                          ? URL.createObjectURL(field.value)
                          : Profile
                      }
                      alt="profile"
                      className="w-[100%] h-[400px] object-cover border border-black"
                    />
                    <input
                      type="file"
                      id="postImage"
                      name="postImage"
                      className="bg-black/20 my-3 py-1 px-3 rounded-md border border-black text-center flex items-center gap-3 w-full max-w-52"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        form.setFieldValue("postImage", file);
                      }}
                    />
                    <ErrorMessage
                      name="postImage"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}
              </Field>
              <div className="flex flex-col w-full pt-4">
                <label name="email" className="text-lg font-semibold">
                  About Post
                </label>
                <Field
                  type="text"
                  id="aboutpost"
                  name="aboutpost"
                  placeholder="Add something About you"
                  className="border-2 border-[#000] focus:border-0 focus:border-3 focus:outline-blue-900 rounded-md py-1 px-3"
                />
                <ErrorMessage
                  name="aboutpost"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col w-full pt-6 max-w-52 mx-auto">
                <button
                  type="submit"
                  className="bg-blue-400 py-2 rounded-md text-me font-semibold"
                >
                  Post
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddPost;
