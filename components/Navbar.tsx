import { Link } from "aleph/react";
import { links } from "~/settings.ts";
import Logo from "./Logo.tsx";
import { GithubIcon, LinkedinIcon, StackOverflowIcon } from "./icons.tsx";

const socialLinks = [
  { link: links.stackoverflow, component: <StackOverflowIcon /> },
  { link: links.linkedin, component: <LinkedinIcon /> },
  { link: links.github, component: <GithubIcon /> },
];

const navigationLinks = [
  { link: "/resume", title: "Resume" },
  { link: "/blog", title: "Blog" },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-900">
      <div className="flex items-center justify-between max-w-4xl px-8 mx-auto">
        <div className="flex justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <ul className="flex ml-10 items-center space-x-5 font-light text-gray-300">
            {navigationLinks.map((item) => (
              <li key={item.link}>
                <Link className="rounded-lg p-2 py-1 hover:bg-gray-700" to={item.link}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex items-center space-x-2 text-sm font-medium text-gray-400">
          {socialLinks.map((item) => (
            <li key={item.link}>
              <Link
                className="px-8 py-2 rounded-lg hover:text-gray-200"
                target="_blank"
                to={item.link}
              >
                {item.component}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
