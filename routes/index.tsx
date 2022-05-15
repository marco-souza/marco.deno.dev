import { site } from "~/settings.ts";
import { ButtonLink } from "~/components/shared.tsx";

export default function Home() {
  return (
    <div className="my-10 grid grid-cols-1 items-center text-center text-gray-200">
      <img
        alt="It's Me"
        src={site.avatarUrl}
        className="my10 h-40 mx-auto rounded-full"
      />

      <div className="text-3xl fw100 animate-bounce-alt animate-count-1 animate-1s">
        {site.title}
      </div>

      <div className="op30 fw300 m1 text-md">
        {site.subtitle}
      </div>

      <div className="grid gap-8 grid-cols-1 my-10 md:mx-20 md:grid-cols-2 ">
        <ButtonLink to={site.cta.primary.link}>{site.cta.primary.text}</ButtonLink>
        <ButtonLink to={site.cta.primary.link} className="text-pink-100">{site.cta.secondary.text}</ButtonLink>
      </div>
    </div>
  );
}
