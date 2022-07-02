/** @jsx h */
import { FunctionComponent, h } from "preact";
import { tw } from "twind";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div class={tw`bg-gray-600 text-blue-100 min-h-screen relative`}>
      <NavBar />

      <div class={tw`container max-w-4xl py-32 min-h-screen mx-auto`}>
        <div class="p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

function NavBar() {
  return (
    <div class={tw`fixed left-0 right-0 top-0 p-4 bg-gray-700 shadow-md`}>
      <a className={tw`logo flex items-center`} href="/">
        <img
          src="/logo.svg"
          class="w-2 h-2"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        Marco's
        <span class={tw`text-red-500`}>
          Labs! 🧑🏽‍🔬
        </span>
      </a>
    </div>
  );
}
