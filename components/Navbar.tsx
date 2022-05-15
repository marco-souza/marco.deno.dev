import { Link } from "aleph/react";
import { links } from "~/settings.ts";
import Logo from "./Logo.tsx";
import { Container } from "./shared.tsx";
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
      <Container className="flex items-center justify-between">
        <div className="flex justify-between">
          <Link to="/">
            <Logo />
          </Link>

          <ul className="flex ml-8 items-center space-x-5 font-light text-gray-300">
            {navigationLinks.map((item) => (
              <li key={item.link}>
                <Link
                  className="rounded-lg p-2 py-1 hover:bg-gray-700"
                  to={item.link}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid grid-gap-4 grid-cols-3 py-4 text-gray-400">
          {socialLinks.map((item) => (
            <li key={item.link}>
              <Link
                className="rounded-lg hover:text-gray-200"
                target="_blank"
                to={item.link}
              >
                {item.component}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
