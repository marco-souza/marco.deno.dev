import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Gear from "~/icon/Gear.tsx";
import Moon from "~/icon/Moon.tsx";
import Sun from "~/icon/Sun.tsx";
import Dots from "~/icon/HDots.tsx";

import { Theme, WithTheme } from "~/shared/types.ts";

export default function ThemeSwitcher(
  { theme = "system" }: Partial<WithTheme>,
) {
  const { selectedTheme, system, toggle } = useTheme(theme);

  return (
    <button
      class="btn btn-circle btn-ghost border-none rounded-full p-2 active:outline-none focus:outline-none"
      disabled={!IS_BROWSER}
      onClick={() => toggle(selectedTheme.value)}
      onContextMenu={(e) => {
        e.preventDefault();
        system();
      }}
    >
      {IS_BROWSER ? iconTheme(selectedTheme.value) : <Dots />}
    </button>
  );
}

function useTheme(theme: Theme) {
  if (!IS_BROWSER) {
    return {
      selectedTheme: { value: "system" as Theme },
      toggle: () => {},
      system: () => {},
    };
  }

  const selectedTheme = useSignal<Theme>(getThemeMode(theme, localStorage));

  const setTheme = (theme: Theme) => {
    if (theme === "system") delete localStorage.theme;
    else localStorage.theme = theme;
    selectedTheme.value = theme;
    applyDocumentClass();
  };

  const toggle = (theme: Theme) => {
    theme =
      document.documentElement.getAttribute("data-theme")?.includes("dark")
        ? "light"
        : "dark";
    return setTheme(theme);
  };

  const system = () => {
    setTheme("system");
    document.documentElement.removeAttribute("data-theme");
  };

  return {
    system,
    toggle,
    selectedTheme,
  };
}

const themeIconMap: Record<Theme, JSX.Element> = {
  dark: <Sun />,
  light: <Moon />,
  system: <Gear />,
};

const iconTheme = (theme: Theme) => themeIconMap[theme];

function getThemeMode(prev: Theme, localStorage: Storage): Theme {
  if (!IS_BROWSER) return prev;
  if (localStorage.theme) return localStorage.theme as Theme;
  return "system";
}

function applyDocumentClass() {
  const storedTheme = localStorage.theme ?? window.localStorage.theme;
  if (storedTheme === "system") return;

  const theme = storedTheme ??
    document.documentElement.getAttribute("data-theme");
  const isDark = theme === "dark";

  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light",
  );

  document.querySelectorAll(".markdown-body").forEach(
    el => el.setAttribute(
      "data-color-mode",
      isDark ? "dark" : "light",
    )
  )
}

export const initialLoadTheme = `(${String(applyDocumentClass)})()`;
