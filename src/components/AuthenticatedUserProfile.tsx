import type { GitHubAuthenticatedProfile } from "~/services/github.ts";
import { parseBioText } from "~/components/GitHubProfile.tsx";

export function AuthenticatedUserProfile(
  { profile }: { profile: GitHubAuthenticatedProfile },
) {
  return (
    <div class="card bg-base-100 shadow-xl md:w-96">
      <figure>
        <img src={profile.avatar_url} alt="It's me" />
      </figure>

      <div class="card-body grid gap-4">
        <h2 class="card-title">
          {profile.name}
          <span class="text-xs text-left text-gray-200 badge badge-outline badge-primary">
            @{profile.login}
          </span>
        </h2>

        <p class="text-xs font-light">{profile.email}</p>

        <p
          class="font-light"
          dangerouslySetInnerHTML={{ __html: parseBioText(profile.bio) }}
        />

        <div class="card-actions justify-center">
          <form hx-post="/user/settings w-full">
            <button type="submit" class="btn btn-primary w-full">
              Register User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
