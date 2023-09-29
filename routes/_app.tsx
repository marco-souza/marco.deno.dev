import { AppProps } from "$fresh/server.ts";
import { initialLoadTheme } from "#/islands/ThemeSwitcher.tsx";
import { Meta } from "~/components/Meta.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <Meta>
        <script src="/htmx.js" />
        <script dangerouslySetInnerHTML={{ __html: initialLoadTheme }} />
      </Meta>

      <body>
        <Component />
      </body>
    </html>
  );
}
