import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });
  // default to local storgage value, or light if no value stored

  useEffect(() => {
    // Add 'dark' class to the root element if the theme is dark
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <button
      onClick={toggleTheme}
      className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 dark:bg-gray-700 dark:hover:bg-blue-900 rounded-md font-medium text-white"
    >
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}
