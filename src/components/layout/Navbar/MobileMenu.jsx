import { forwardRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import NavigationMenuRoutes from './navigation-menu-routes.js';

const MobileMenu = forwardRef(
  ({ isOpen, setMobileMenuOpen, isDropdownOpen, setIsDropdownOpen }, ref) => {
    const handleDropdownToggle = (name) => {
      setIsDropdownOpen((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    };

    const handleLinkClick = () => {
      setMobileMenuOpen(false);
      setIsDropdownOpen({});
    };

    return (
      <>
        {/* Backdrop Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sidebar Menu */}
        <div
          ref={ref}
          className={`fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-white dark:bg-slate-900 shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-slate-800 dark:text-white">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
            <ul className="space-y-1">
              {NavigationMenuRoutes.map((link, index) =>
                !link.dropdown ? (
                  // Normal Link
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                          isActive
                            ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ) : (
                  // Dropdown Link
                  <li key={index}>
                    <button
                      onClick={() => handleDropdownToggle(link.name)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen[link.name] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Items */}
                    <ul
                      className={`overflow-hidden transition-all duration-200 ${
                        isDropdownOpen[link.name] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {link.items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            to={item.path}
                            onClick={handleLinkClick}
                            className="block pl-8 pr-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </>
    );
  }
);

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
