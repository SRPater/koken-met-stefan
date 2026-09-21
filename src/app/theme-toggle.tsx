"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  if (!mounted) {
    return <div className="h-8 w-14" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label="Wissel donkere modus"
      className="relative h-8 w-14 rounded-full bg-stone-200 transition-colors dark:bg-stone-700"
    >
      <span
        className={`absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs shadow transition-transform dark:bg-stone-900 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
