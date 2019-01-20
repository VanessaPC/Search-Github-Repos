import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import MainView from "./dashboard/MainView/mainView";
import * as serviceWorker from "./serviceWorker";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import { Provider } from "react-redux";
import configureStore from "./store";

const TOKEN = "a1dd711e8d1ade34787e304c65d03394bc7cd0f5";
const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: TOKEN ? `Bearer ${TOKEN}` : ""
    }
  };
});

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Provider store={configureStore(client)}>
    <ApolloProvider client={client}>
      <MainView />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
