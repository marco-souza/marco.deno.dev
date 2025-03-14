import type { PropsWithChildren } from "hono/jsx";
import { GitHubProfileCard } from "~/components/GitHubProfile.tsx";
import type { GitHubProfile } from "~/services/github.ts";
import { configs } from "~/constants.ts";

type Props = PropsWithChildren<{
  profile: GitHubProfile;
}>;

const ProfileSideBar = ({ profile }: Props) => (
  <div class="text-center skip-printer">
    <div class="flex flex-col gap-8 sticky top-10">
      <GitHubProfileCard profile={profile} />

      <a
        href={configs.contact_me}
        class="btn btn-outline btn-secondary hover:text-white hover:animate-pulse mx-4"
      >
        Let's have a Coffee ☕️
      </a>

      <button
        type="button"
        href={configs.contact_me}
        class="btn btn-outline hover:animate-pulse mx-4"
        onClick={() => { globalThis.print(); }}
      >
        Print Resume 🖨️
      </button>
    </div>
  </div>
);

export function ResumePage(props: Props) {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
      <ProfileSideBar profile={props.profile} />

      <div class="gap-8 grid w-full col-span-2">
        <div
          hx-get="partials/resume"
          hx-trigger="load"
          hx-swap="outerHTML"
        >
          <img
            alt="Result loading..."
            class="mx-auto"
            width="64"
            src="/static/img/bars.svg"
          />
        </div>
      </div>
    </div>
  );
}
