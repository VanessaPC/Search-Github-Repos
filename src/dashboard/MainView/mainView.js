import React from "react";
import logo from "../../logo.svg";
import "./app.css";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_REPOSITORIES = gql`
  {
    organization(login: "facebook") {
      repositories(first: 60) {
        edges {
          node {
            id
            name
            url
          }
        }
      }
    }
  }
`;

const App = () => (
  <Query query={GET_REPOSITORIES}>
    {({ data: { organization }, loading }) => {
      if (loading || !organization) {
        return <div>Loading</div>;
      }
      return (
        <div>
          <RepositoryList repositories={organization.repositories} />
        </div>
      );
    }}
  </Query>
);

const RepositoryList = ({ repositories }) => (
  <ul>
    {repositories.edges.map(({ node }) => {
      return (
        <li key={node.id}>
          <a href={node.url} target="_blank" rel="noopener noreferer">
            {node.name}
          </a>
        </li>
      );
    })}
  </ul>
);

export default App;
