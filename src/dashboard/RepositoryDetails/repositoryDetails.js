import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const RepositoryDetails = props => {
  const data = props.organization.data;
  return (
    <section>
      <h2>details </h2>
      <p>{data && data.repository.assignableUsers.totalCount}</p>
    </section>
  );
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryDetails);
