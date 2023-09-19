import { z } from "zod";
import { settings } from "~/settings.ts";
import { logger } from "~/shared/logging.ts";

const GitHubProfileSchema = z.object({
  bio: z.string(),
  name: z.string(),
  login: z.string(),
  avatar_url: z.string(),
})

export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;

class GitHub {
  async fetchProfile() {
    const resp = await fetch(
      `https://api.github.com/users/${settings.GITHUB_PROFILE}`
    );
    const body = await resp.json();
    logger.info({ body })
    return GitHubProfileSchema.parse(body)
  }
}


export const github = new GitHub()
