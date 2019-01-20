import { Organization, RepositoryData } from "../utils/types";

export const FETCH_ORGANIZATION = "FETCH_ORGANIZATION";
export const FETCH_ORGANIZATION_SUCCESS = "FETCH_ORGANIZATION_SUCCESS";
export const FETCH_ORGANIZATION_FAILURE = "FETCH_ORGANIZATION_FAILURE";
export const FETCH_REPOSITORY_INFORMATION = "FETCH_REPOSITORY_INFORMATION";
export const FETCH_REPOSITORY_INFORMATION_SUCCESS =
  "FETCH_REPOSITORY_INFORMATION_SUCCESS";
export const FETCH_REPOSITORY_INFORMATION_FAILURE =
  "FETCH_REPOSITORY_INFORMATION_FAILURE";

export const fetchOrganization = () => ({
  type: FETCH_ORGANIZATION
});

export const fetchOrganizationSuccess = (organization: Organization) => {
  return {
    type: FETCH_ORGANIZATION_SUCCESS,
    payload: { ...organization }
  };
};

export const fetchOrganizationFailure = (message: string) => ({
  type: FETCH_ORGANIZATION_FAILURE,
  payload: message
});

export const fetchRepositoryInformation = (repositoryName: string) => ({
  type: FETCH_REPOSITORY_INFORMATION,
  payload: repositoryName
});

export const fetchRepositoryInformationSuccess = (
  repositoryDetails: RepositoryData
) => ({
  type: FETCH_REPOSITORY_INFORMATION_SUCCESS,
  payload: { ...repositoryDetails }
});

export const fetchRepositoryInformationFailure = (message: string) => ({
  type: FETCH_REPOSITORY_INFORMATION_FAILURE,
  payload: message
});
