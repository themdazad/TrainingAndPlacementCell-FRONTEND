
import { Divider } from "@heroui/react";
import { Code } from "lucide-react";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import ThemeSwitch from "../ui/ThemeSwitch";

export function Footer() {
  return (
    <>
      <Divider />
      <footer className="flex flex-wrap-reverse justify-center text-[14px] max-sm:text-center md:justify-between items-center py-4 px-[5%] max-sm:gap-4">
        <p>
          2025 ©Copyright reserved.<br />
          Developed with <span className="text-red-600">❤</span> By {" "}
          <a className="font-semibold text-sky-600" target="_blank" href="https://www.linkedin.com/in/modest-azad/">
            Azad | T&P Cell, GEC Siwan
          </a>
        </p>
        <div className="icons flex items-center space-x-4 text-2xl">
          <NavLink to="/developer-credit"
          >
           <Code/>
          </NavLink>
          <a
            href="https://www.linkedin.com/company/tpogecsiwan/"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
          <a href="https://" target="_blank">
            <FaTwitter />
          </a>
          <ThemeSwitch />
        </div>
      </footer>
    </>
  );
}
