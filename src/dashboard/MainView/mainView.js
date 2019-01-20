import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchOrganization } from "../../actions";

import { Router, Link } from "@reach/router";

import "./app.css";

import RepositoryList from "../RepositoryList/repositoryList";
import RepositoryDetails from "../RepositoryDetails/repositoryDetails";

class MainView extends Component {
  constructor(props) {
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

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch =>
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
