import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "@reach/router";

import { Organization } from "../../utils/types";

interface RepositoryListProps {
  organization: Organization;
  isLoading?: boolean;
  error?: string;
}

interface RepositoryListState {
  organization: Organization;
}

class RepositoryList extends React.Component<
  RepositoryListProps,
  RepositoryListState
> {
  displayList = (organization: Organization) => (
    <div className="list-container">
      {this.props.isLoading && <div className="lds-dual-ring" />}
      {!this.props.isLoading &&
        !this.props.error &&
        organization.repositories &&
        organization.repositories.edges.map(({ node }) => {
          return (
            <li key={node.id}>
              <Link
                to={`repository/${node.name}`}
                className="text list-container__item"
              >
                {node.name}
              </Link>
              <span className="list-container__item_number annotation">
                {node.watchers.totalCount} watchers
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
      <section className="list">
        <h1>Facebook</h1>
        <p className="text">60 most popular repos:</p>
        {this.displayList(organization)}
      </section>
    );
  }
}

const mapStateToProps = (state: RepositoryListState) => {
  return { ...state, organization: state.organization };
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);
