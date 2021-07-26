import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { loginReducer } from "./components/login/LoginReducer";
import { postsReducer } from "./components/posts/PostsReducer";
import { commentsReducer } from "./components/comments/CommentsReducer";

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        auth: loginReducer,
        posts: postsReducer,
        comments: commentsReducer
    });

export default createRootReducer;