"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="skeu-toggle relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
    >
      <span
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{ opacity: theme === "dark" ? 1 : 0 }}
      >
        <Moon className="absolute inset-0 m-auto h-4 w-4 text-blue-300" />
      </span>
      <span
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{ opacity: theme === "light" ? 1 : 0 }}
      >
        <Sun className="absolute inset-0 m-auto h-4 w-4 text-amber-500" />
      </span>
    </button>
  );
}
