import {
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_FAILURE,
  FETCH_ORGANIZATION_INFORMATION,
  FETCH_REPOSITORY_INFORMATION_SUCCESS,
  FETCH_REPOSITORY_INFORMATION_FAILURE
} from "../actions";
import { string } from "postcss-selector-parser";

const initialState = {
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  console.log("payload: ", action.payload);
  switch (action.type) {
    case FETCH_ORGANIZATION:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_ORGANIZATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: null
      };
    case FETCH_ORGANIZATION_FAILURE:
      return {
        organization: [],
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
