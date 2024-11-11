import type { FC } from "hono/jsx";

export const ThemeSwitcher: FC = () => {
  function toggleTheme() {
    const htmlElement = document.documentElement;

    let selectedTheme = htmlElement.dataset.theme;
    if (selectedTheme === "system") {
      selectedTheme =
        globalThis.matchMedia("(prefers-color-scheme: dark)")?.matches
          ? "dark"
          : "light";
    }

    const newTheme = selectedTheme === "dark" ? "light" : "dark";

    htmlElement.dataset.theme = newTheme;
    document.cookie = `selected-theme=${newTheme}`;
  }

  return (
    <button
      id="toggle-theme"
      class="btn btn-primary"
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
};
