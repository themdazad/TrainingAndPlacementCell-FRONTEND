import { Link } from 'react-router-dom';

const CollegeLogo = () => (
  <Link
    to="/"
    className="flex items-center gap-3 md:gap-4 flex-shrink-0 hover:scale-105 transition-transform duration-300"
  >
    <img className="h-16 md:h-20 w-auto" src="/images/logos/collegelogo.png" alt="GEC Siwan Logo" />
    <div className="hidden md:flex flex-col">
      <h1 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
        Training and Placement Cell
      </h1>
      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-tight">
        Government Engineering College Siwan
      </p>
    </div>
  </Link>
);
export default CollegeLogo;
