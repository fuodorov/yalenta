import { SET_TOKEN, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  token: "",
  access_token: "",
  refresh_token: ""
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        access_token: action.payload
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        refresh_token: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    case UNSET_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
};