import { z } from "zod";
import { settings } from "~/settings.ts";
import { logger } from "~/shared/logging.ts";
import { kv } from "~/services/db.ts";

const GitHubProfileSchema = z.object({
  bio: z.string(),
  name: z.string(),
  login: z.string(),
  avatar_url: z.string(),
});

export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;

class GitHub {
  private expireIn = 3 * 60 * 60 * 1000; // 3h
  private username = settings.GITHUB_PROFILE;
  private profileKey = ["gh:profile", this.username];

  async fetchProfile() {
    const { username, profileKey, expireIn } = this;

    // get cached profile
    const cachedProfile = await kv.get(profileKey);
    if (cachedProfile?.value) {
      logger.debug("Returning cached profile");
      return GitHubProfileSchema.parse(cachedProfile.value);
    }

    // fetch
    const resp = await fetch(`https://api.github.com/users/${username}`);
    const body = await resp.json();

    // parse
    logger.debug({ body });
    const profile = GitHubProfileSchema.parse(body);

    // persist
    await kv.set(profileKey, profile, { expireIn: expireIn });

    logger.debug({ profile });
    return profile;
  }
}

export const github = new GitHub();
