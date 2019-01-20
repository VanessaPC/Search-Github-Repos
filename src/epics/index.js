import { combineEpics } from "redux-observable";
import gql from "graphql-tag";

import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";

import {
  FETCH_ORGANIZATION,
  fetchOrganizationSuccess,
  //   FETCH_ORGANIZATION_SUCCESS,
  //   FETCH_ORGANIZATION_FAILURE,
  FETCH_REPOSITORY_INFORMATION,
  fetchRepositoryInformationSuccess
  //   FETCH_REPOSITORY_INFORMATION_SUCCESS,
  //   FETCH_REPOSITORY_INFORMATION_FAILURE
} from "../actions";

function fetchOrganizationEpic(action$, state$, { client }) {
  return action$
    .ofType(FETCH_ORGANIZATION)
    .switchMap(() => {
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
        .then(result => fetchOrganizationSuccess(result.data.organization));
    })
    .catch(err => {
      console.log("result: ", err);
      return err;
    });
}

function fetchRepositoryEpic(action$, state$, { client }) {
  return action$.ofType(FETCH_REPOSITORY_INFORMATION).switchMap(action => {
    return client
      .query({
        query: gql`
          {
            repository(name: "${action.payload}", owner: "facebook") {
              assignableUsers {
                totalCount
              }
            }
          }
        `
      })
      .then(result =>
        fetchRepositoryInformationSuccess(result.data.repository)
      );
  });
}

export const rootEpic = combineEpics(
  fetchOrganizationEpic,
  fetchRepositoryEpic
);
