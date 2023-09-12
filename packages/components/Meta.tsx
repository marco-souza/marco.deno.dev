import { Head } from "$fresh/runtime.ts";
import { site } from "~/settings.ts";
import { WithChildren } from "~/shared/types.ts";

export function Meta({ children }: WithChildren) {
  return (
    <Head>
      <title>{site.title}</title>

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta name="description" content={site.description} />
      <meta name="keywords" content={site.keywords} />

      {children}
    </Head>
  );
}
