import { defineRoute } from "$fresh/server.ts";
import ErrorPage from "~/components/ErrorPage.tsx";

export default defineRoute(({ url }) => {
  return (
    <ErrorPage
      code={404}
      title="Page not found"
      description={`Page '${url}' not found`}
    >
      <a href="/" class="btn border-pink-500 text-pink-500">
        Go Home
      </a>
    </ErrorPage>
  );
});
