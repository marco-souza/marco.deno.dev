import type { FC } from "hono/jsx";
import type { GitHubProfile } from "~/services/github.ts";
import { configs } from "~/constants.ts";

type Props = {
  profile: GitHubProfile;
};

export const GitHubProfileView: FC<Props> = ({ profile }) => {
  return (
    <div class="max-w-2xl px-8 mx-auto">
      <div class="flex flex-col gap-10 my-8 xl:my-16 2xl:my-32 items-center text-center">
        <div class="gap-2 flex flex-col">
          <img
            alt="It's Me"
            src={profile.avatar_url}
            class="h-40 mx-auto rounded-full"
          />

          <div class="text-3xl font-light">{profile.name}</div>
        </div>

        <div
          class="opacity-70 font-extralight text-md px-4 sm:px-20 md:px-32"
          dangerouslySetInnerHTML={{ __html: parseBioText(profile.bio) }}
        />

        <div class="grid gap-8 grid-cols-1 sm:mx-20 sm:grid-cols-2 w-full">
          <a
            href="#"
            class="btn btn-outline text-pink-400 hover:text-white hover:bg-pink-400 hover:animate-zoom-in"
          >
            Primary
          </a>
          <a
            href="#"
            class="btn btn-outline hover:animate-zoom-in"
          >
            Secondary
          </a>
        </div>
      </div>
    </div>
  );
};

export const GitHubProfileViewSkeleton = () => (
  <GitHubProfileView
    profile={{ bio: "", name: "", login: "", avatar_url: "" }}
  />
);

export function parseBioText(text: string | undefined): string {
  if (text == null) return "";

  const tagRegex = /\@(\w*)/g;
  const linksMap: Map<string, string> = new Map(Object.entries(configs.links));

  const result = text.replace(tagRegex, (originalText, name: string) => {
    const link = linksMap.get(name);

    if (link) {
      return `<a class="text-pink-400" target="blank" href="${link}">${originalText}</a>`;
    }
    return originalText;
  });

  return result;
}
