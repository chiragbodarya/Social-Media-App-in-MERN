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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
