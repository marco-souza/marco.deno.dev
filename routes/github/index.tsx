/** @jsx h */
import { FunctionComponent, h } from "preact";
import { tw } from "twind";
import { z } from "zod";
import { Handlers, PageProps } from "$fresh/server.ts";

const GithubProfile = z.object({
  login: z.string(),
  name: z.string(),
  bio: z.string(),
  avatar_url: z.string(),
});

const GithubException = z.object({
  message: z.string(),
  documentation_url: z.string().optional(),
});

interface Data {
  profile: z.infer<typeof GithubProfile> | null;
  error: z.infer<typeof GithubException> | null;
  username: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username") ?? "";

    // validate username
    if (!username) {
      return ctx.render({
        error: null,
        profile: null,
        username,
      });
    }

    // fetch profile
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render({
        profile: null,
        error: {
          message: `User "${username}" not found :(`,
        },
        username,
      });
    }

    // parse/validate response
    const responseBody = await resp.json();
    const profile = GithubProfile.safeParse(responseBody);
    if (!profile.success) {
      const error = GithubException.parse(responseBody);
      return ctx.render({ profile: null, error, username });
    }
    return ctx.render({ profile: profile.data, error: null, username });
  },
};

export default function ProfileSearch({ data }: PageProps<Data>) {
  const { profile, username, error } = data;
  return (
    <div class={tw`text-center grid gap-4`}>
      <h1 class={tw`center text-4xl p-4`}>Github Profile</h1>
      <form>
        <input
          autoFocus
          type="text"
          name="username"
          placeholder="Search a github profile..."
          class={tw`px-4 py-2 bg-transparent border border-r-0`}
          value={username}
        />
        <button class={tw`border py-2 px-4 border-l-0`} type="submit">
          Search
        </button>
      </form>
      <GithubError error={error} />
      {username.trim() != "" && (
        <div class="grid gap-4 mx-auto ">
          <GithubProfileCard profile={profile} />
        </div>
      )}
    </div>
  );
}

const GithubError: FunctionComponent<Pick<Data, "error">> = ({ error }) => {
  if (!error) return null;
  return <p class={tw`text-red-200`}>Oops, {error.message}</p>;
};

const GithubProfileCard: FunctionComponent<Pick<Data, "profile">> = (
  { profile },
) => {
  if (!profile) {
    return <h2>User not found :(</h2>;
  }

  return (
    <div
      class={tw
        `text-center grid gap-2 p-16 border rounded-lg bg-gray-800 shadow`}
    >
      <img
        src={profile.avatar_url}
        class={tw`rounded-full mx-auto`}
        width={64}
        height={64}
      />
      <h2 class={tw`text-2xl font-extralight`}>{profile.name}</h2>
      <p class={tw`text-sm`}>@{profile.login}</p>
      <p>{profile.bio}</p>
    </div>
  );
};
