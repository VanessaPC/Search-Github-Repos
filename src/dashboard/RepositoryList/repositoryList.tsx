import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchRepositoryInformation } from "../../actions";
import { Link } from "@reach/router";

import { Organization } from "../../utils/types";

interface RepositoryListProps {
  organization: Organization;
  isLoading?: boolean;
  error?: string;

  fetchRepositoryInformation: (repositoryName: string) => Object;
}

interface RepositoryListState {
  organization: Organization;
}

class RepositoryList extends React.Component<
  RepositoryListProps,
  RepositoryListState
> {
  fetchDetails = (repoName: string) => {
    this.props.fetchRepositoryInformation(repoName);
  };

  displayList = (organization: Organization) => (
    <div className="sidebar-container">
      {this.props.isLoading && <div className="lds-dual-ring" />}
      {!this.props.isLoading &&
        !this.props.error &&
        organization.repositories &&
        organization.repositories.edges.map(({ node }) => {
          return (
            <li className="sidebar-container__item" key={node.id}>
              <Link
                to={`repository/${node.name}`}
                onClick={this.fetchDetails.bind(this, node.name)}
              >
                {node.name}
              </Link>
              <span className="sidebar-container__item_number">
                {node.watchers.totalCount}
              </span>
            </li>
          );
        })}
      {this.props.error && <h1>{this.props.error}</h1>}
    </div>
  );

  render() {
    const organization: Organization = this.props.organization;
    return (
      <section className="sidebar">
        <h2>Facebook</h2>
        {this.displayList(organization)}
      </section>
    );
  }
}

const mapStateToProps = (state: RepositoryListState) => {
  return { ...state, organization: state.organization };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchRepositoryInformation
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);
