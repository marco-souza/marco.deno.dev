import { z } from "zod";
import { configs } from "~/constants.ts";
import { markdownToHTML } from "~/services/markdown.ts";
import { assert } from "@m3o/errors";

const GitHubProfileSchema = z.object({
  bio: z.string(),
  name: z.string(),
  login: z.string(),
  avatar_url: z.string(),
});

export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;

class GitHub {
  constructor(private username = configs.username) {}

  async fetchAuthenticatedProfile(token: string) {
    assert(token.trim().length > 0, "Missing token");

    const resp = await fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const body = await resp.json();
    const profile = GitHubProfileSchema.parse(body);

    return profile;
  }

  async fetchProfile() {
    // fetch
    const resp = await fetch(`https://api.github.com/users/${this.username}`);
    const body = await resp.json();

    // parse
    const profile = GitHubProfileSchema.parse(body);

    return profile;
  }

  async fetchResume() {
    // fetch
    const resp = await fetch(configs.github.resume);
    const body = await resp.text();

    // parse
    return markdownToHTML(body);
  }
}

export const github = new GitHub();
