/** @jsx h */
import { h } from "preact";
import { AppProps } from "$fresh/server.ts";
import Layout from "~components/Layout.tsx";

export default function App({ Component }: AppProps) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}
