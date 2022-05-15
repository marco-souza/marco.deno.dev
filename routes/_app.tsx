import Layout from "../components/Layout.tsx";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}
