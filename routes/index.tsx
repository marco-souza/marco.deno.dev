import { site } from "~/settings.ts";
import { defineRoute } from "$fresh/server.ts";
import { parseBioText } from "~/shared/formatters.ts";
import { github } from "~/services/github.ts";

export default defineRoute(async () => {
  const profile = await github.fetchProfile();
  return (
    <div class="max-w-2xl px-8 mx-auto mx-8">
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
          class="opacity-70 font-extralight text-md px-10 sm:px-20 md:px-32"
          dangerouslySetInnerHTML={{ __html: parseBioText(profile.bio) }}
        />

        <div class="grid gap-8 grid-cols-1 sm:mx-20 sm:grid-cols-2 w-full">
          <a
            href={site.cta.primary.link}
            class="btn btn-outline text-pink-400 hover:text-white hover:bg-pink-400 hover:animate-zoom-in"
          >
            {site.cta.primary.text}
          </a>
          <a
            href={site.cta.secondary.link}
            class="btn btn-outline hover:animate-zoom-in"
          >
            {site.cta.secondary.text}
          </a>
        </div>
      </div>
    </div>
  );
});
