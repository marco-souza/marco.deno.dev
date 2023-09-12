import { site } from "~/settings.ts";
import { defineRoute } from "$fresh/server.ts";
import TremTecLogo from "~/icon/TremTecLogo.tsx";
import ThemeSwitcher from "#/islands/ThemeSwitcher.tsx";

export default defineRoute(() => {
  return (
    <>
      <div class="text-center flex flex-col gap-8 items-center">
        <h1 class="text-4xl">
          <TremTecLogo size={240} class="animate-bounce hover:animate-ping" />
          {site.name}
        </h1>

        <h2 class="text-sm">{site.subTitle}</h2>
        <ThemeSwitcher />
      </div>
    </>
  );
});
