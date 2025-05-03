import { Switch } from "@heroui/react"
import { MoonStar, Sun } from "lucide-react";
import { useState, useEffect } from "react"

const ThemeSwitch = () => {

  // Get the system's theme preference or fall back to 'light'
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const savedTheme = localStorage.getItem('theme');

  const [theme, setTheme] = useState(savedTheme || systemTheme);

  useEffect(() => {
     // Save the selected theme in localStorage
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <Switch
      defaultSelected={theme === "dark"}
      size="lg"
      color="default"
      startContent={<Sun />}
      endContent={<MoonStar />}

      onChange={() => {
        setTheme(theme === "light" ? "dark" : "light")
      }}
    >
    </Switch>
    
  )
};

export default ThemeSwitch