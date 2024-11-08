import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  const handleToggleChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-lg">Dark Mode:</span>
      <label htmlFor="dark-mode-toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="dark-mode-toggle"
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleToggleChange}
            className="sr-only"
          />
          <div className="block bg-gray-400 w-12 h-6 rounded-full"></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
              theme === "dark" ? "transform translate-x-6" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
}
