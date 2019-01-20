import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";

import { Observable } from "rxjs/Observable";

import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";

export default function configureStore(client: any) {
  const epicMiddleware = createEpicMiddleware({ dependencies: { client } });
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
}
