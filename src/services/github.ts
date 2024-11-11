import { z } from "zod";
import { configs } from "~/constants.ts";

const GitHubProfileSchema = z.object({
  bio: z.string(),
  name: z.string(),
  login: z.string(),
  avatar_url: z.string(),
});

export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;

class GitHub {
  constructor(private username = configs.username) {}

  async fetchProfile() {
    // fetch
    const resp = await fetch(`https://api.github.com/users/${this.username}`);
    const body = await resp.json();

    // parse
    const profile = GitHubProfileSchema.parse(body);

    return profile;
  }
}

export const github = new GitHub();
