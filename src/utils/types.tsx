// Create two types, for organization and repository
export interface Organization {
  repositories: {
    edges: [
      {
        node: {
          id: string;
          name: string;
          url: string;
          watchers: {
            totalCount: number;
          };
        };
      }
    ];
  };
}

export interface RepositoryData {
  id: string;
  assignableUsers: {
    totalCount: number;
  };
  name: string;
  description: string;
  diskUsage: number;
  forkCount: number;
  hasWikiEnabled: boolean;
  homepageUrl: string;
  isArchived: boolean;
  isFork: boolean;
  isLocked: boolean;
  isPrivate: boolean;
  languages: RepositoryLanguages;
  mentionableUsers: RepositoryMentionableUsers;
  contributors: [RepositoryContributors];
}

export interface RepositoryLanguages {
  edges: [
    {
      node: {
        id: string;
        name: string;
      };
    }
  ];
}

export interface RepositoryMentionableUsers {
  edges: [
    {
      node: {
        company: string;
        id: string;
        location: string;
        name: string;
      };
    }
  ];
}

export interface RepositoryContributors {
  avatar_url: string;
  contributions: number;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}
