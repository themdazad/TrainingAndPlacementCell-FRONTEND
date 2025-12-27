import { Globe, Linkedin, Twitter } from 'lucide-react';

export default function Footer1() {
  return (
    <footer className="bg-slate-100 py-4 border-t-4 rounded-3xl border-blue-500 dark:bg-slate-900 transition-all duration-200">

      <div className="max-w-screen-2xl mx-auto px-4 flex flex-row flex-wrap items-center gap-4">
        {/* copyright / text */}
        <div className="w-full sm:w-auto text-center sm:text-left text-sm text-slate-600 dark:text-slate-300">
          <a
            href="https://www.gecsiwan.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 dark:hover:text-blue-400"
          >
            © 2025, Training and Placement Cell
            <br />
            <b>Government Engineering College, Siwan</b>
          </a>
        </div>

        {/* social media icons (moved to right side) */}
        <div className="flex items-center gap-4 ml-auto">
          <a
            href="https://www.linkedin.com/company/tpogecsiwan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-700 dark:text-slate-300 hover:text-blue-500"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="https://www.gecsiwan.org/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
            className="text-slate-700 dark:text-slate-300 hover:text-blue-500"
          >
            <Globe size={20} />
          </a>

          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-slate-700 dark:text-slate-300 hover:text-blue-500"
          >
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
