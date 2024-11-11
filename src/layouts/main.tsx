import type { PropsWithChildren } from "hono/jsx";
import type { FC } from "hono/jsx";
import type { Theme } from "~/shared/theme.ts";

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

        <title>{props.theme ?? "Hello Hono!"}</title>

        <link rel="stylesheet" href="/static/css/styles.min.css" />
      </head>

      <body>{props.children}</body>
    </html>
  );
};
