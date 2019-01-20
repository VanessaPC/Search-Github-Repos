import { combineReducers } from "redux";
import { organizationReducer, repositoryReducer } from "./repositoryReducer";

export default combineReducers({
  organization: organizationReducer,
  repository: repositoryReducer
});
