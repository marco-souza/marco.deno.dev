import type { PropsWithChildren } from "hono/jsx";
import type { FC } from "hono/jsx";
import type { Theme } from "~/shared/theme.ts";
import { Footer } from "~/components/Footer.tsx";
import { NavBar } from "~/components/NavBar.tsx";

type Props = PropsWithChildren<{
  title?: string;
  theme?: Theme;
}>;

export const Layout: FC<Props> = (props) => {
  return (
    <html data-theme={props.theme ?? "system"}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script src="/static/js/htmx.min.js"></script>

        <title>{props.title ?? "Hello Hono!"}</title>

        <link rel="stylesheet" href="/static/css/styles.min.css" />
      </head>

      <body>
        <div class="grid gap-24 container mx-auto">
          <NavBar />

          <div class="px-8">
            {props.children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
};
