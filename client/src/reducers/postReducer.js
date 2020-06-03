import {
  GET_POSTS,
  POST_ERROR,
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_LIKES,
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
    case GET_POST:
      return {
        ...state,
        post: payload,
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
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
      };
    default:
      return state;
  }
}
