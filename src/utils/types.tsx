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
  assignableUsers: {
    totalCount: number;
  };
}
