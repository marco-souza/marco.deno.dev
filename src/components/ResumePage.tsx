import type { PropsWithChildren } from "hono/jsx";
import { GitHubProfileCard } from "~/components/GitHubProfile.tsx";
import type { GitHubProfile } from "~/services/github.ts";
import { configs } from "~/constants.ts";

type Props = PropsWithChildren<{
  profile: GitHubProfile;
}>;

const ProfileSideBar = ({ profile }: Props) => (
  <div class="px-8 mx-auto w-full skip-printer">
    <div class="flex flex-col gap-10 my-8 xl:my-16 2xl:my-32 items-center text-center">
      <GitHubProfileCard profile={profile} />

      <div class="actions grid 2xl:grid-cols-2 gap-8 w-full">
        <a
          href={configs.contact_me}
          class="btn btn-outline btn-secondary hover:text-white hover:animate-pulse"
        >
          Let's grab a Coffee ☕️
        </a>

        <button
          type="button"
          href={configs.contact_me}
          class="btn btn-outline hover:animate-pulse"
          onClick={() => globalThis.print()}
        >
          Print Resume 🖨️
        </button>
      </div>
    </div>
  </div>
);

export function ResumePage(props: Props) {
  return (
    <div class="grid md:grid-cols-3 gap-4">
      <ProfileSideBar profile={props.profile} />

      <div class="gap-8 grid w-full md:col-span-2">
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
