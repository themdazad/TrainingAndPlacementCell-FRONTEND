import { useEffect } from "react"

const AutoThemeListener = () => {

  // Follow system theme only; add/remove Tailwind 'dark' class
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystemTheme = () => {
      if (mql.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    applySystemTheme();
    mql.addEventListener("change", applySystemTheme);
    return () => mql.removeEventListener("change", applySystemTheme);
  }, []);

  // No UI needed; this component only applies side effects
  return null;
};

export default AutoThemeListener;