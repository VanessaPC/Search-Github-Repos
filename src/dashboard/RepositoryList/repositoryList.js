import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchRepositoryInformation } from "../../actions";
import { Link } from "@reach/router";

class RepositoryList extends Component {
  fetchDetails = repoName => {
    this.props.fetchRepositoryInformation(repoName);
  };

  displayList = organization => (
    <div>
      {this.props.isLoading && <h1>coming!</h1>}
      {!this.props.isLoading &&
        !this.props.error &&
        organization.repositories &&
        organization.repositories.edges.map(({ node }) => {
          return (
            <li key={node.id}>
              <Link
                to={`repository/${node.name}`}
                onClick={this.fetchDetails.bind(this, node.name)}
              >
                {node.name}
              </Link>
            </li>
          );
        })}
      {this.props.error && <h1>{this.props.error}</h1>}
    </div>
  );

  render() {
    const organization = this.props.organization;
    return (
      <div>
        <h1>sidebar:</h1>
        {this.displayList(organization)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state, organization: state.organization };
};

const mapDispatchToProps = dispatch =>
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
