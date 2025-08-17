import { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="p-2 rounded-full transition"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <FiSun className="text-xl md:text-2xl text-yellow-400" />
      ) : (
        <FaMoon className="text-xl md:text-2xl text-gray-200" />
      )}
    </button>
  );
};

export default ThemeToggle;