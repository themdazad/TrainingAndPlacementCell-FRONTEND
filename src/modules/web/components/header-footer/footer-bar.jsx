import { Globe, Linkedin, Twitter, } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" bg-gray-100 py-4 space-y-4 border-t-4 rounded-3xl border-blue-500 dark:bg-gray-900 transition-all duration-200">
      {/* social media icons */}
      <div className="max-w-screen-2xl m-auto flex justify-center gap-4 items-center ">
        <a href="https://www.linkedin.com/company/tpogecsiwan/" target="_blank">
          <Linkedin />
        </a>
        <a href="https://www.gecsiwan.org/" target="_blank">
          <Globe />
        </a>
        <a href="" target="_blank">
          <Twitter />
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm flex flex-col gap-4 text-gray-600 dark:text-gray-300 ">
        <a
          href="https://www.gecsiwan.org/"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-blue-500 dark:hover:text-blue-400"
        >
          © 2025, Training and Placement Cell <br />{" "}
          <b>Government Engineering College, Siwan</b>
        </a>
        <a
          href="https://www.linkedin.com/in/themdazad/"
          target="_blank"
          rel="noopener noreferrer"
          className=" text-blue-500"
        >
          {"<Developer/>"}
        </a>
      </div>
    </footer>
  );
}
