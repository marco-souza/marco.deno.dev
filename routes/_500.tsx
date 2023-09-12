import { ErrorPageProps } from "$fresh/server.ts";
import ErrorPage from "~/components/ErrorPage.tsx";

export default function InternalErrorPage({ error }: ErrorPageProps) {
  return (
    <ErrorPage
      code={500}
      title="Internal server error"
      description={`An error occured: ${error}`}
    >
      <a href="/" class="btn border-pink-500 text-pink-500">
        Go Home
      </a>
    </ErrorPage>
  );
}
