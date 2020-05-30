import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE,
  EDIT_PROFILE,
  UPDATE_PROFILE,
} from '../actions/type';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = { initialState }, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case CREATE_PROFILE:
    case EDIT_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };

    default:
      return state;
  }
}
