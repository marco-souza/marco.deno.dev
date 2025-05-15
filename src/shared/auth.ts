import { z } from "zod";
import { GitHubAuth } from "@m3o/auth";

export const GitHubProfileSchema = z.object({
  bio: z.string(),
  name: z.string(),
  login: z.string(),
  avatar_url: z.string(),
});

export const GitHubAuthenticatedProfileSchema = GitHubProfileSchema.extend({
  email: z.string(),
});

export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;
export type GitHubAuthenticatedProfile = z.infer<
  typeof GitHubAuthenticatedProfileSchema
>;

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
