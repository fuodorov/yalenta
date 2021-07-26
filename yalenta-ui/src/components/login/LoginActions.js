import { push } from "connected-react-router";
import { toast } from "react-toastify";
import { SET_CURRENT_USER, UNSET_CURRENT_USER, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from "./LoginTypes";
import { setAxiosAuthAccessToken, toastOnError } from "../../utils/Utils";
import { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE_PASSWORD } from "./LoginSettings";
import customAxios from "../../utils/CustomAxios";

export const login = (userData, redirectTo) => dispatch => {
    userData.append('grant_type', GRANT_TYPE_PASSWORD)
    userData.append('client_id', CLIENT_ID)
    userData.append('client_secret', CLIENT_SECRET)
    customAxios
        .post("/o/token/", userData, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }})
        .then(response => {
            const { access_token } = response.data;
            const { refresh_token } = response.data;
            const { expires_in } = response.data;
            setAxiosAuthAccessToken(access_token);
            dispatch(setAccessToken(access_token));
            dispatch(setRefreshToken(refresh_token));
            dispatch(setExpiresOn(expires_in));
            dispatch(getCurrentUser(redirectTo));
        })
        .catch(error => {
            dispatch(unsetCurrentUser());
            toastOnError(error);
        });
};

export const getCurrentUser = redirectTo => dispatch => {
    customAxios
        .get("/users/me/")
        .then(response => {
            const user = {
                username: response.data.username,
                email: response.data.email
            };
            dispatch(setCurrentUser(user, redirectTo));
        })
        .catch(error => {
            dispatch(unsetCurrentUser());
            if (error.response) {
                if (
                    error.response.status === 401 &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data.hasOwnProperty("detail") &&
                    error.response.data["detail"] === "User inactive or deleted."
                ) {
                    dispatch(push("/resend_activation"));
                }
            } else {
                toastOnError(error);
            }
        });
};

export const setCurrentUser = (user, redirectTo) => dispatch => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    });

    if (redirectTo !== "") {
        dispatch(push(redirectTo));
    }
};

export const setAccessToken = access_token => dispatch => {
    localStorage.setItem("access_token", access_token);
    dispatch({
        type: SET_ACCESS_TOKEN,
        payload: access_token
    });
};

export const setRefreshToken = refresh_token => dispatch => {
    localStorage.setItem("refresh_token", refresh_token);
    dispatch({
        type: SET_REFRESH_TOKEN,
        payload: refresh_token
    });
};

export const setExpiresOn = expires_in => dispatch => {
    localStorage.setItem("expires_on", Date.now() + expires_in * 1000);
    dispatch({
        type: SET_ACCESS_TOKEN,
        payload: Date.now() + expires_in * 1000
    });
};

export const unsetCurrentUser = () => dispatch => {
    setAxiosAuthAccessToken("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_on");
    localStorage.removeItem("user");
    dispatch({
        type: UNSET_CURRENT_USER
    });
};

export const logout = (userData) => dispatch => {
    userData.append('client_id', CLIENT_ID)
    userData.append('client_secret', CLIENT_SECRET)
    userData.append('token', localStorage.getItem("access_token"))
    customAxios
        .post("/o/revoke_token/", userData, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }})
        .then(response => {
            dispatch(unsetCurrentUser());
            dispatch(push("/"));
            toast.success("Logout successful.");
        })
        .catch(error => {
            dispatch(unsetCurrentUser());
            toastOnError(error);
        });
};