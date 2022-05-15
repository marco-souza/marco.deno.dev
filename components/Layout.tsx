import { Head } from "aleph/react";
import { site } from "~/settings.ts";

import Navbar from "./Navbar.tsx";
import { Container, ChildrenProps } from "./shared.tsx";

export default function Layout({ children }: ChildrenProps) {
  return (
    <div className="h-full bg-gray-700">
      <Head>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
      </Head>
      <Navbar />
      <Container>
        {children}
      </Container>
    </div>
  );
}
