import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import Settings from "./routes/Settings";
import { EntryProvider } from "./utilities/globalContext";

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme ? savedTheme : "light"; // Default to light mode

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <Router>
        <EntryProvider>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<AllEntries />}></Route>
            <Route path="create" element={<NewEntry />}></Route>
            <Route path="edit/:id" element={<EditEntry />}></Route>
            <Route path="settings" element={<Settings />}></Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  );
}
