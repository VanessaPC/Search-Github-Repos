import { combineReducers } from "redux";
import { organizationReducer, repositoryReducer } from "./index";

export default combineReducers({
  organization: organizationReducer,
  repository: repositoryReducer
});
