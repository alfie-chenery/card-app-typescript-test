// Settings.tsx
import React from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function Settings() {
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md dark:bg-gray-500">
      <h1 className="text-2xl font-bold text-center mb-4 text-black dark:text-white">Settings</h1>
      <ThemeToggle />
    </section>
  );
}
