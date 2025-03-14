import type { FC } from "hono/jsx";
import type { Theme } from "~/shared/theme.ts";

export const ThemeSwitcher: FC<{ theme: Theme }> = ({ theme }) => {
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
    document.cookie = `selected-theme=${newTheme}; path=/`;

    const btn = document.getElementById("toggle-theme");
    if (!btn) return;

    btn.innerText = newTheme === "dark" ? "🌙" : "☀️";
  }

  return (
    <button
      id="toggle-theme"
      type="button"
      class="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {theme === "system" ? "⚙️" : theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};
