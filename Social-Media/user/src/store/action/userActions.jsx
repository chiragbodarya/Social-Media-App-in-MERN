import userData from "../../user.json";
import { GET_USER } from "../type";

export const getUser = () => {
  // Call API
  // Logical statement
  // Progress
  let user = userData;
  return {
    type: GET_USER,
    payload: user,
  };
};
