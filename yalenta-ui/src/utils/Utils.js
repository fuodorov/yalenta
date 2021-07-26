import customAxios from "./CustomAxios";
import { toast } from "react-toastify";

export const setAxiosAuthAccessToken = access_token => {
  if (typeof access_token !== "undefined" && access_token) {
    // Apply for every request
    customAxios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
  } else {
    // Delete auth header
    delete customAxios.defaults.headers.common["Authorization"];
  }
};

export const getExpirationDate = token => {
  if (!token) {return null;}
  const jwt = JSON.parse(atob(token));
  return jwt.exp;
};

export const isExpired = exp => {
    if (!exp) {return false;}
    return Date.now() > exp;
};

export const toastOnError = error => {
  if (error.response) {
    // known error
    toast.error(JSON.stringify(error.response.data));
  } else if (error.message) {
    toast.error(JSON.stringify(error.message));
  } else {
    toast.error(JSON.stringify(error));
  }
};

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);