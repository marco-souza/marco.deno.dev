import { parseBioText } from "~/components/GitHubProfile.tsx";
import type { GitHubAuthenticatedProfile } from "~/shared/auth.ts";

export function AuthenticatedUserProfile(
  { profile }: { profile: GitHubAuthenticatedProfile },
) {
  return (
    <div class="card bg-base-100 shadow-xl md:w-96">
      <figure>
        <img src={profile.avatar_url} alt="It's me" />
      </figure>

      <div class="card-body grid gap-4">
        <div class="header flex flex-col gap-2">
          <h2 class="card-title">
            {profile.name}
          </h2>
          <p class="text-xs text-left text-gray-200 badge badge-outline badge-primary">
            @{profile.login}
          </p>
        </div>

        <p class="text-xs font-light">{profile.email}</p>

        <p
          class="font-light"
          dangerouslySetInnerHTML={{ __html: parseBioText(profile.bio) }}
        />
      </div>
    </div>
  );
}
