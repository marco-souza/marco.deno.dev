import { configs, time } from "~/constants.ts";
import { markdownToHTML } from "~/services/markdown.ts";
import { assert } from "@m3o/errors";
import {
  GitHubAuthenticatedProfileSchema,
  GitHubProfileSchema,
} from "../shared/auth.ts";

const db = await Deno.openKv();

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
    const profile = GitHubAuthenticatedProfileSchema.parse(body);

    return profile;
  }

  async fetchProfile() {
    const cachedProfile = await db.get(["github", "profile"]);
    if (cachedProfile.versionstamp) {
      return GitHubProfileSchema.parse(cachedProfile.value);
    }

    // fetch
    const resp = await fetch(`https://api.github.com/users/${this.username}`);
    const body = await resp.json();

    // cache
    const expireIn = 5 * time.MINUTE;
    await db.set(["github", "profile"], body, { expireIn });

    // parse
    return GitHubProfileSchema.parse(body);
  }

  async fetchResume() {
    const cachedResume = await db.get<string>(["github", "resume"]);
    if (cachedResume.versionstamp) {
      return markdownToHTML(cachedResume.value);
    }

    // fetch
    const resp = await fetch(configs.github.resume);
    const body = await resp.text();

    // cache
    const expireIn = 5 * time.MINUTE;
    await db.set(["github", "resume"], body, { expireIn });

    // parse
    return markdownToHTML(body);
  }
}

export const github = new GitHub();
