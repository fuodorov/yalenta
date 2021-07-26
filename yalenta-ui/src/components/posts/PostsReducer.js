import { GET_POSTS, ADD_POST, DELETE_POST, UPDATE_POST } from "./PostsTypes";

const initialState = {
  posts: []
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.results
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((item, index) => item.id !== action.payload)
      };
    case UPDATE_POST:
      const updatedPosts = state.posts.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        posts: updatedPosts
      };
    default:
      return state;
  }
};