import GECSIWAN_LOGO from "../assets/images/logos/gecsiwanlogo.svg";
import GECSIWAN_LOGO_LIGHT from "../assets/images/logos/gecsiwan-logo-light.png";
import RandomLoadingMessage from "./RandomLoadingMessage.jsx";

export default function Loader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center gap-4 animate-fadeIn backdrop-blur-sm bg-white/30 dark:bg-neutral-900/30 px-6 py-6 rounded-xl shadow-lg">
        {/* Light mode logo */}
        <img
          src={GECSIWAN_LOGO}
          alt="Loading logo"
          className="dark:hidden w-28 h-28 animate-pulse select-none"
        />

        {/* Dark mode logo */}
        <img
          src={GECSIWAN_LOGO_LIGHT}
          alt="Loading logo"
          className="hidden dark:inline w-28 h-28 animate-pulse select-none"
        />

        <RandomLoadingMessage />
      </div>
    </div>
  );
}
