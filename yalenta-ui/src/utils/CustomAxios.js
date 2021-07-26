import axios from "axios";
import {CLIENT_ID, CLIENT_SECRET, GRANT_TYPE_REFRESH, REFRESH_TIMEOUT} from "../components/login/LoginSettings";
import { setAxiosAuthAccessToken } from "./Utils";

const customAxios = axios.create({// Add configurations here
    baseURL: "http://127.0.0.1:8000/api/v1",
});

// For GET requests
customAxios.interceptors.request.use(
    (req) => {
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// For POST requests
customAxios.interceptors.response.use(
    (res) => {
        if ( localStorage.getItem("expires_on") ) {
            if ( localStorage.getItem("expires_on") - Date.now() <= REFRESH_TIMEOUT) {
                const userData = new URLSearchParams();
                userData.append('grant_type', GRANT_TYPE_REFRESH)
                userData.append('client_id', CLIENT_ID)
                userData.append('client_secret', CLIENT_SECRET)
                userData.append('refresh_token', localStorage.getItem("refresh_token"))
                customAxios
                    .post("/o/token/", userData, {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(response => {
                        const { access_token } = response.data;
                        const { refresh_token } = response.data;
                        const { expires_in } = response.data;
                        setAxiosAuthAccessToken(access_token);
                        localStorage.setItem("access_token", access_token);
                        localStorage.setItem("refresh_token", refresh_token);
                        localStorage.setItem("expires_on", Date.now() + expires_in * 1000);
                    });
            }
        }
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default customAxios;