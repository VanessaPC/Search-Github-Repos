import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchOrganization } from "../../actions";

import "./app.css";

import RepositoryList from "../RepositoryList/repositoryList";

class MainView extends Component {
  constructor(props) {
    super(props);
    this.props.fetchOrganization();
  }

  render() {
    return (
      <div>
        <RepositoryList />
      </div>
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
