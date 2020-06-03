import {
  GET_POSTS,
  POST_ERROR,
  CREATE_POST,
  DELETE_POST,
} from '../actions/type';

const inititalState = {
  post: null,
  posts: [],
  loading: true,
  error: [],
};

export default function (state = { inititalState }, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        posts: [],
        loading: false,
        error: payload,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false,
      };
    default:
      return state;
  }
}
