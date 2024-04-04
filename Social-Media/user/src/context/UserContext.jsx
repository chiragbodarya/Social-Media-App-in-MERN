import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("token ----> ", token);
    if (!user && token) {
      axios
        .get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          // console.log("data ===  ", response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    } else {
      console.log("user is not login");
    }
  }, []);
  // console.log("user context", user);

  if (user && user.profileImg) {
    // console.log("user", user);
    // console.log("user.profileImg", user.profileImg);
    let ProfileImag = user.profileImg.replace("public\\", "");
    // console.log("ProfileImag", ProfileImag);
    user.profileImg = ProfileImag;
  } else {
    console.log("User or profile image not found");
  }
  // console.log("user.profileImg contatext user.profileImg", user.profileImg);
  // console.log("this is context user", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
