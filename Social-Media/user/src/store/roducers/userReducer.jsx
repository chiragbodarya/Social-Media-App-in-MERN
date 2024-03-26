import { GET_USER } from "../type";

let initialState = {
  user: [],
  error: null,
  isLoadin: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
