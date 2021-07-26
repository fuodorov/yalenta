import { GET_POSTS, ADD_POST, DELETE_POST, UPDATE_POST, GET_COMMENTS, ADD_COMMENT } from "./PostsTypes";
import {setAxiosAuthAccessToken, toastOnError} from "../../utils/Utils";
import customAxios from "../../utils/CustomAxios";

export const getPosts = (page, per_page) => dispatch => {
    customAxios
        .get(`/posts/?page=${page}&per_page=${per_page}`)
        .then(response => {
            dispatch({
                type: GET_POSTS,
                payload: response.data
            })
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const addPost = post => dispatch => {
    setAxiosAuthAccessToken(localStorage.getItem("access_token"));
    customAxios
        .post("/posts/", post, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            dispatch({
                type: ADD_POST,
                payload: response.data
            })
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const deletePost = id => dispatch => {
    setAxiosAuthAccessToken(localStorage.getItem("access_token"));
    customAxios
        .delete(`/posts/${id}/`)
        .then(response => {
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const updatePost = (id, post) => dispatch => {
    setAxiosAuthAccessToken(localStorage.getItem("access_token"));
    customAxios
        .patch(`/posts/${id}/`, post, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            dispatch({
                type: UPDATE_POST,
                payload: response.data
            })
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const getComments = () => dispatch => {
    setAxiosAuthAccessToken(localStorage.getItem("access_token"));
    customAxios
        .get("/comments/")
        .then(response => {
            dispatch({
                type: GET_COMMENTS,
                payload: response.data
            })
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const addComment = comment => dispatch => {
    setAxiosAuthAccessToken(localStorage.getItem("access_token"));
    customAxios
        .post(`/comments/`, comment, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            dispatch({
                type: ADD_COMMENT,
                payload: response.data
            })
        })
        .catch(error => {
            toastOnError(error);
        });
};