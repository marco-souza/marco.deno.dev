import { FunctionComponent } from "preact";
import { z } from "zod";
import { Handlers, PageProps } from "$fresh/server.ts";

const GithubProfile = z.object({
  name: z.string(),
  login: z.string(),
  avatar_url: z.string(),
  html_url: z.string(),
  bio: z.string().nullable(),
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
      const error = GithubException.safeParse(responseBody);
      if (!error.success) {
        console.log({ responseBody, err: profile.error });
        return ctx.render({ profile: null, error: null, username });
      }
      return ctx.render({ profile: null, error: error.data, username });
    }
    return ctx.render({ profile: profile.data, error: null, username });
  },
};

export default function ProfileSearch({ data }: PageProps<Data>) {
  const { profile, username, error } = data;
  const hasUsername = username.trim() != "";
  return (
    <div class="text-center grid gap-4">
      <h1 class="center text-4xl p-4">
        Github <span class="text-blue-400 font-extralight">Finder</span>
      </h1>
      <form>
        <input
          autoFocus
          type="text"
          name="username"
          placeholder="Search a github profile..."
          class="px-4 py-2 bg-transparent border border-r-0"
          value={username}
        />
        <button class="border py-2 px-4 border-l-0" type="submit">
          Search
        </button>
      </form>

      <GithubError error={error} />
      {hasUsername && (
        <div class="p-4 flex justify-center">
          <GithubProfileCard profile={profile} />
        </div>
      )}
    </div>
  );
}

const GithubError: FunctionComponent<Pick<Data, "error">> = ({ error }) => {
  if (!error) return null;
  return <p class="text-red-300 text-sm">Oops, {error.message}</p>;
};

const GithubProfileCard: FunctionComponent<Pick<Data, "profile">> = (
  { profile },
) => {
  if (!profile) {
    return <h2>User not found :(</h2>;
  }

  const cardStyle = `
    text-center grid gap-2 px-16 py-8
    border rounded-lg bg-gray-500 shadow
    max-w-md hover:shadow-2xl
  `;
  return (
    <a href={profile.html_url} target="_blank">
      <div class={cardStyle}>
        <img
          src={profile.avatar_url}
          class="rounded-full mx-auto"
          width={64}
          height={64}
        />
        <h2 class="text-2xl font-extralight">{profile.name}</h2>
        <p class="text-sm hover:underline">@{profile.login}</p>
        {profile.bio?.split("\n").map((i) => <p>{i}</p>)}
      </div>
    </a>
  );
};
