import GithubIcon from "~/components/icons/GitHubIcon.tsx";
import { auth } from "~/shared/auth.ts";

export function LoginPage({ errors = "" }) {
  const githubButton = (
    <div class="flex items-center gap-2">
      <GithubIcon />
      <span>Sign in with GitHub</span>
    </div>
  );

  return (
    <div class="card shadow-md max-w-96 mx-auto">
      <div class="card-body gap-8">
        <div className="header text-center">
          <h1 class="text-3xl">
            Sign in to <span class="text-primary">my lab</span>
          </h1>

          <h2 class="text-sm font-light">
            Welcome back! Please sign in to continue
          </h2>
        </div>

        <form
          class="grid gap-4"
          action={auth.urls.signIn}
          hx-boost="false"
        >
          <button class="btn btn-outline btn-secondary w-full" type="submit">
            {githubButton}
          </button>

          <p class="text-xs text-gray-500">
            We use GitHub for authentication to keep things simple and secure.
          </p>
        </form>

        {errors && <p class="text-red-500">{errors}</p>}
      </div>
    </div>
  );
}
