"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Use a default state (light mode) until the client is mounted
  const [isDarkMode, setIsDarkMode] = useState(null);

  // This effect will run only after the component mounts on the client
  useEffect(() => {
    // Check localStorage and update the theme after the initial render
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []); // Empty dependency array ensures this runs once after the first render

  // This effect will run every time the theme changes
  useEffect(() => {
    if (isDarkMode !== null) {
      // If isDarkMode is set (after the first render), update localStorage and class
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // We return a loading state while the theme is still being determined
  if (isDarkMode === null) {
    return <>
    </>
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
