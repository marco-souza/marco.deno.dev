import Navbar from "../components/Navbar.tsx";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
