import { combineEpics } from "redux-observable";
import gql from "graphql-tag";

import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";

import {
  FETCH_ORGANIZATION,
  fetchOrganizationSuccess,
  fetchOrganizationFailure,
  FETCH_REPOSITORY_INFORMATION,
  fetchRepositoryInformationSuccess,
  fetchRepositoryInformationFailure
} from "../actions";

function fetchOrganizationEpic(action$, state$, { client }) {
  return action$.ofType(FETCH_ORGANIZATION).switchMap(() => {
    return client
      .query({
        query: gql`
          {
            organization(login: "facebook") {
              repositories(first: 60) {
                edges {
                  node {
                    id
                    name
                    url
                    watchers {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        `
      })
      .then(result => {
        result.data.organization.repositories.edges.sort((a, b) => {
          if (a.node.watchers.totalCount > b.node.watchers.totalCount) {
            return -1;
          }
          if (a.node.watchers.totalCount < b.node.watchers.totalCount) {
            return 1;
          }
          return 0;
        });

        return fetchOrganizationSuccess(result.data.organization);
      })
      .catch(err => {
        return fetchOrganizationFailure(err);
      });
  });
}

const callV3 = action => {
  return fetch(
    `https://api.github.com/repos/facebook/${action.payload}/contributors`
  ).then(response => response.json());
};

const callV4 = (client, action) => {
  return client
    .query({
      query: gql`
        {
          repository(name: "${action.payload}", owner: "facebook") {
            id
            name
            assignableUsers {
              totalCount
            }
            description
            createdAt
            diskUsage
            forkCount
            hasWikiEnabled
            homepageUrl
            isArchived
            isFork
            isLocked
            isPrivate
            languages(first: 20){
              edges {
                node {
                  id
                  name
                }
              }
            }
            mentionableUsers(first: 10) {
              edges {
                node {
                  id
                  name
                  company
                  location
                }
              }
            }
          }
        }
      `
    })
    .then(result => result.data.repository);
};

// Using v3 and v4 apis since contributors isn't supported by the v4 API
// https://platform.github.community/t/contributors-of-a-repository/3680/11
function fetchRepositoryEpic(action$, state$, { client }) {
  return action$
    .ofType(FETCH_REPOSITORY_INFORMATION)
    .switchMap(action => {
      return Promise.all([callV4(client, action), callV3(action)]).then(
        response => {
          const repository = response[0];
          repository.contributors = response[1];

          return fetchRepositoryInformationSuccess(repository);
        }
      );
    })
    .catch(err => {
      return fetchRepositoryInformationFailure(err);
    });
}

export const rootEpic = combineEpics(
  fetchOrganizationEpic,
  fetchRepositoryEpic
);
