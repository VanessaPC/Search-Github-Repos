import {
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_FAILURE,
  FETCH_REPOSITORY_INFORMATION_SUCCESS,
  FETCH_REPOSITORY_INFORMATION_FAILURE,
  FETCH_REPOSITORY_INFORMATION
} from "../actions";

interface Action {
  payload: {} | [];
  type: string;
}

interface State {
  isLoading: boolean;
  error: string;
}

const initialState = {
  isLoading: false,
  error: null
};

export const organizationReducer = (
  state: {} = initialState,
  action: Action
) => {
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

export const repositoryReducer = (state: {} = initialState, action: Action) => {
  console.log("payload: ", action.payload);
  switch (action.type) {
    case FETCH_REPOSITORY_INFORMATION:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_REPOSITORY_INFORMATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: null
      };
    case FETCH_REPOSITORY_INFORMATION_FAILURE:
      return {
        ...state,
        repository: {},
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
