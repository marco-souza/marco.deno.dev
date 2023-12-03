import { defineApp } from "$fresh/server.ts";
import { initialLoadTheme } from "#/islands/ThemeSwitcher.tsx";
import { Meta } from "~/components/Meta.tsx";
import { logger } from "~/shared/logging.ts";

export default defineApp((req, ctx) => {
  logger.info(req);

  return (
    <html>
      <Meta>
        <script src="/htmx.js" />
        <script dangerouslySetInnerHTML={{ __html: initialLoadTheme }} />
      </Meta>

      <body>
        <ctx.Component />
      </body>
    </html>
  );
});
