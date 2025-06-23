import GECSIWAN_LOGO from "../assets/images/logos/gecsiwanlogo.svg";
import GECSIWAN_LOGO_LIGHT from "../assets/images/logos/gecsiwan-logo-light.png";
import { Button } from "@heroui/react";
import { NavLink } from "react-router-dom";

export default function Error_404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      {/* Container for spinner + logo */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={GECSIWAN_LOGO}
          alt="Loader image "
          className="dark:hidden w-56 h-56 m-auto "
          style={{ userSelect: "none" }}
        />
        <img
          src={GECSIWAN_LOGO_LIGHT}
          alt="Loader image "
          className="hidden dark:inline-flex w-56 h-56 m-auto animate-pulse"
          style={{ userSelect: "none" }}
        />
        <p className="animate-pulse text-blue-500 text-3xl text-center font-extrabold">404 <br/> Page not found! </p>
        <Button as={NavLink} to="/" varient={"solid"} color="primary">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
