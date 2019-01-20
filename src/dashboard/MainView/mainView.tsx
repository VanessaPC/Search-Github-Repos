import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchOrganization } from "../../actions";

import { Router } from "@reach/router";

import RepositoryList from "../RepositoryList/repositoryList";
import RepositoryDetails from "../RepositoryDetails/repositoryDetails";

interface MainViewProps {
  fetchOrganization: () => {};
}

interface MainViewState {}

class MainView extends React.Component<MainViewProps, MainViewState> {
  constructor(props: MainViewProps) {
    super(props);
    this.props.fetchOrganization();
  }

  render() {
    return (
      <main>
        <div className="sidebar">
          <RepositoryList />
        </div>
        <div className="main-content">
          <Router>
            <RepositoryDetails path="/repository/:repositoryId" />
          </Router>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state: MainViewState) => ({ ...state });

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchOrganization
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
