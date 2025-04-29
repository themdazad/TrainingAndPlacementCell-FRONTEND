import { Divider } from "@heroui/react";
import { Code } from "lucide-react";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";


export function Footer() {
  return (
    <>
      <Divider />
      <footer className="px-[5%] py-8 max-w-[1920px] m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-700 dark:text-gray-300">
          
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold mb-2">T&P Cell</h3>
            <ul className="space-y-1">
              <li><NavLink to="/contact-us">Contact Us</NavLink></li>
              <li><NavLink to="/careers">Careers</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1">
              <li><a href="/docs">Interview Tips</a></li>
              <li><a href="/tutorials">Mock Interview</a></li>
              <li><a href="/support">Support Center</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/security">Security</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold mb-2">Connect</h3>
            <div className="flex space-x-4 text-xl mb-4">
              <a href="https://linkedin.com"><FaLinkedinIn /></a>
              <a href="https://twitter.com"><FaTwitter /></a>
            </div>
            
          </div>
        </div>

        <div className="mt-8  pt-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs">
            2025 ©Copyright reserved. Developed with <span className="text-red-600">❤</span> by{" "}
            <a 
              className="font-semibold text-sky-600" 
              href="https://www.linkedin.com/in/modest-azad/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Azad | T&P Cell, GEC Siwan
            </a>
          </p>
          <NavLink to="/developer-credit" className="mt-2 md:mt-0">
            <Code className="inline mr-1" /> Developer Credits
          </NavLink>
        </div>
      </footer>
    </>
  );
}
