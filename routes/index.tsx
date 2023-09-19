import { site } from "~/settings.ts";
import { defineRoute } from "$fresh/server.ts";
import { parseBioText } from "~/shared/formatters.ts";
import { github } from "~/services/github.ts";
import { apply, tw } from "twind";

const container = apply`max-w-xl px-8 mx-auto min-h-[80vh]`

export default defineRoute(async () => {
  const profile = await github.fetchProfile();
  return (
    <div class={tw(container)}>
      <div class="flex flex-col gap-10 my-8 xl:my-16 2xl:my-32 items-center text-center text-gray-200">
        <div class="gap-2 flex flex-col">
          <img
            alt="It's Me"
            src={profile.avatar_url}
            class="h-40 mx-auto rounded-full"
          />

          <div class="text-3xl font-light">{profile.name}</div>
        </div>

        <div
          class="opacity-70 font-extralight text-md text-gray-300 sm:px-20 md:px-40"
          dangerouslySetInnerHTML={{ __html: parseBioText(profile.bio) }}
        />

        <div class="grid gap-8 grid-cols-1 sm:mx-20 sm:grid-cols-2 w-full 2xl:w-[50%] p-8">
          <a
            href={site.cta.primary.link}
            class="btn btn-outline text-pink-400 animate-bounce"
          >
            {site.cta.primary.text}
          </a>
          <a
            href={site.cta.secondary.link}
            class="btn btn-outline text-pink-50 animate-bounce"
          >
            {site.cta.secondary.text}
          </a>
        </div>
      </div>
    </div>
  );
});
