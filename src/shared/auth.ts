import type { GitHubAuthenticatedProfile } from "~/services/github.ts";
import { GitHubAuth } from "@m3o/auth";

export const auth = new GitHubAuth({
  scope: "read:user user:email",
  client_id: Deno.env.get("GITHUB_CLIENT_ID") || "client_id",
  client_secret: Deno.env.get("GITHUB_CLIENT_SECRET") || "client_secret",
});

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
