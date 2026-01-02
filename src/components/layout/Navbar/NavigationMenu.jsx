import { NavLink, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import NavigationMenuRoutes from './navigation-menu-routes.js';

const NavigationMenu = ({ isDropdownOpen, setIsDropdownOpen }) => {
  return (
    <div className="flex items-center space-x-1">
      {NavigationMenuRoutes.map((link, index) =>
        !link.dropdown ? (
          // Normal Link
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`
            }
          >
            {link.name}
          </NavLink>
        ) : (
          // Dropdown Link (Jaise: Academics, Departments)
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen({ [link.name]: true })}
            onMouseLeave={() => setIsDropdownOpen({ [link.name]: false })}
          >
            <span className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
              {link.name}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isDropdownOpen[link.name] ? 'rotate-180' : ''}`}
              />
            </span>

            {/* Dropdown Menu Items */}
            <ul
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 min-w-max shadow-lg rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 transition-all ${
                isDropdownOpen[link.name] ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              {link.items.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default NavigationMenu;
