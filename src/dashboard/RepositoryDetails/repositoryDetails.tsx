import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { RepositoryData } from "../../utils/types";

interface RepositoryDetailsProps {
  repository?: RepositoryData;
  path: string;
}

interface RepositoryDetailsState {
  isLoading: boolean;
  error: string;
}

const RepositoryDetails = (
  props: RepositoryDetailsProps,
  state: RepositoryDetailsState
) => {
  return (
    <section>
      <h2>details </h2>
      {props.repository && props.repository.assignableUsers && (
        <p>{props.repository.assignableUsers.totalCount}</p>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryDetails);
