/** @jsx h */
import { h } from "preact";
import { AppProps } from "$fresh/server.ts";
import Layout from "~components/Layout.tsx";
import { site } from "#/settings.ts";

export default function App({ Component }: AppProps) {
  const headers = (
    <head>
      <title>{site.title}</title>
      <meta name="description" content={site.description} />
      <meta name="keywords" content={site.keywords} />
    </head>
  );

  return (
    <Layout>
      {headers}
      <Component />
    </Layout>
  );
}
