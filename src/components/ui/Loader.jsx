
import { Image } from "@heroui/react";
import GECSIWAN_LOGO from "../../assets/images/logos/gecsiwanlogo.svg";
import GECSIWAN_LOGO_LIGHT from "../../assets/images/logos/gecsiwan-logo-light.png";
import RandomLoadingMessage from "../../utils/RandomLoadingMessage.jsx"
// components/Loader.js
export default function Loader() {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-zinc-800">
        {/* Container for spinner + logo */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src={GECSIWAN_LOGO}
            alt="Loader image "
            className="dark:hidden w-56 h-56 m-auto animate-pulse"
            style={{ userSelect: "none" }}
          />
          <Image
            src={GECSIWAN_LOGO_LIGHT}
            alt="Loader image "
            className="hidden dark:inline-flex w-56 h-56 m-auto animate-pulse"
            style={{ userSelect: "none" }}
          />
        <RandomLoadingMessage/>
        </div>
      </div>
    );    
}
  