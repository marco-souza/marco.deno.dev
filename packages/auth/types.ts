export type Credentials = {
  client_id: string;
  client_secret: string;
  scope: string;
};

export type AccessToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
  scope: string;
};

export type AccessTokenError = {
  error: string;
  error_uri?: string;
  error_description?: string;
};

export type FetchAccessToken = Credentials & {
  code: string;
};

export type RefreshAccessToken = Credentials & {
  refresh_token: string;
  grant_type: "refresh_token";
};

export type GithubProfile = {
  id: number; // GitHub IDs are typically numbers, but they might be represented as strings in some contexts
  login: string;
  node_id: string; // UUID (e.g., "MDQ6VXNlcjk3MzQ=")
  avatar_url: string;
  gravatar_id: string; // Empty string indicates no Gravatar available
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string; // Can have a `{privacy}` path parameter
  received_events_url: string;
  type: string; // In this case, it's always "User"
  user_view_type: string; // In this case, it's always "public"
  site_admin: boolean;
  name: string;
  blog: string;
  public_repos: number; // Number of public repositories
  public_gists: number; // Number of public gists
  followers: number; // Number of followers
  following: number; // Number of people being followed
  created_at: string; // ISO 8601 date string converted to Date object
  updated_at: string; // ISO 8601 date string converted to Date object
  bio?: string;
  email?: string;
  company?: string;
  location?: string;
  hireable?: string; // Typically a 'yes' or 'no' string
  twitter_username?: string;
};

export interface AuthenticatedProfile extends GithubProfile {
  email: string; // requires email access role
}
