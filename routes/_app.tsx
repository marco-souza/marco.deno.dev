import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Layout from "~components/Layout.tsx";
import { site } from "~settings";

export default function App({ Component }: AppProps) {
  const headers = (
    <Head>
      <title>{site.title}</title>
      <meta name="description" content={site.description} />
      <meta name="keywords" content={site.keywords} />
    </Head>
  );

  return (
    <Layout>
      {headers}
      <Component />
    </Layout>
  );
}
