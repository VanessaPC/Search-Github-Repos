import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  RepositoryData,
  RepositoryContributors,
  RepositoryLanguages
} from "../../utils/types";

import { fetchRepositoryInformation } from "../../actions";

import { RouteComponentProps } from "@reach/router";

interface RepositoryDetailsProps extends RouteComponentProps {
  repository?: RepositoryData;
  repositoryId?: string;

  fetchRepositoryInformation?: (repositoryName: string) => Object;
}

interface RepositoryDetailsState {
  isLoading: boolean;
  error: string;
}

const RepositoryInformation = (
  forkCount: number,
  hasWikiEnabled: boolean,
  isArchived: boolean,
  isPrivate: boolean,
  isFork: boolean,
  isLocked: boolean
) => {
  return (
    <div className="details-description">
      <p className="annotation">Details: </p>
      <div className="details-description__container">
        <p className="small-text">ForkCount: {forkCount}</p>
        <p className="small-text">
          {hasWikiEnabled ? "Wiki enabled." : "Wiki not enabled."}
        </p>
        <p className="small-text">
          {isArchived ? "Archived." : "Not archived."}
        </p>
        <p className="small-text">
          {isPrivate ? "Public repository." : "Private repository."}
        </p>
        <p className="small-text">
          {isFork ? "Initially forked!" : "Not initially forked!"}
        </p>
        <p className="small-text">{isLocked ? "Locked!" : "Not locked!"}</p>
      </div>
    </div>
  );
};

const Languages = (languages: RepositoryLanguages) => {
  return (
    <div className="details-languages">
      <p className="annotation">Languages used in the repository: </p>
      {languages.edges.map(language => {
        return (
          <span key={language.node.id} className="text details-languages__node">
            {language.node.name}
          </span>
        );
      })}
    </div>
  );
};

const Contributors = (contributors: [RepositoryContributors]) => {
  return (
    <div className="details-contributors">
      <p className="annotation">Contributors: </p>
      <div className="details-contributors__container">
        {contributors.map(c => {
          return (
            <div key={c.id} className="details-contributors__card">
              <img
                src={c.avatar_url}
                className="details-contributors__card-image"
              />

              <p className="details-contributors__card-paragraph text">
                <span className="annotation">user: </span>
                {c.login}
              </p>
              <p className="details-contributors__card-paragraph text">
                <span className="annotation">contributions: </span>
                {c.contributions}
              </p>
              <p className="details-contributors__card-paragraph text">
                <span className="annotation">followers: </span>
                {c.type}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Title = (name: string, date: string, description: string) => {
  return (
    <div>
      <span className="annotation">Repository: </span>
      <span className="title">{name}</span>
      <p className="small-text">Created on: {date}</p>
      <p className="small-text">{description}</p>
    </div>
  );
};

const RepositoryDetails = (
  props: RepositoryDetailsProps,
  state: RepositoryDetailsState
) => {
  useEffect(
    () => {
      if (props.fetchRepositoryInformation && props.repositoryId) {
        props.fetchRepositoryInformation(props.repositoryId);
      }
    },
    [props.repositoryId]
  );

  if (!props.repository || !props.repository.name) {
    return (
      <div className="details-message">
        <h3> Click on a repo to see the details!</h3>
      </div>
    );
  } else {
    return (
      <section className="details-container">
        {Title(
          props.repository.name,
          props.repository.createdAt,
          props.repository.description
        )}
        {RepositoryInformation(
          props.repository.forkCount,
          props.repository.hasWikiEnabled,
          props.repository.isArchived,
          props.repository.isPrivate,
          props.repository.isFork,
          props.repository.isLocked
        )}
        {Languages(props.repository.languages)}
        {Contributors(props.repository.contributors)}
      </section>
    );
  }
};

const mapStateToProps = (state: any) => {
  return { ...state, repository: state.repository };
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
)(RepositoryDetails);
