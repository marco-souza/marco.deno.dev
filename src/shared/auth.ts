import type { GitHubAuthenticatedProfile } from "~/services/github.ts";

export type AuthenticatedContext = {
  auth_token: string;
  refresh_token: string;
  profile: GitHubAuthenticatedProfile;
};

export const AUTH_KEYS = {
  authToken: "auth_token",
  refreshToken: "refresh_token",
} as const;

export const ALLOWED_USERS = ["marco-souza"];
