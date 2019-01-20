import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchOrganization } from "../../actions";

class RepositoryList extends Component {
  displayList = organization => (
    <div>
      {this.props.isLoading && <h1>coming!</h1>}
      {!this.props.isLoading &&
        !this.props.error &&
        organization.repositories &&
        organization.repositories.edges.map(({ node }) => {
          return (
            <li key={node.id}>
              <a href={node.url}>{node.name}</a>
            </li>
          );
        })}
      {this.props.error && <h1>{this.props.error}</h1>}
    </div>
  );

  render() {
    console.log("props in sidebar? ", this.props);
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
      fetchOrganization
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);
