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

export const fetchOrganizationSuccess = organization => {
  console.log("action", organization);
  console.log("whats here: ", {
    type: "FETCH_ORGANIZATION_SUCCESS",
    payload: organization
  });
  return {
    type: FETCH_ORGANIZATION_SUCCESS,
    payload: { ...organization }
  };
};

export const fetchOrganizationFailure = message => ({
  type: FETCH_ORGANIZATION_FAILURE,
  payload: message
});

export const fetchRepositoryInformation = () => ({
  type: FETCH_REPOSITORY_INFORMATION
});

export const fetchRepositoryInformationSuccess = () => ({
  type: FETCH_REPOSITORY_INFORMATION_SUCCESS
});
export const fetchRepositoryInformationFailure = () => ({
  type: FETCH_REPOSITORY_INFORMATION_FAILURE
});
