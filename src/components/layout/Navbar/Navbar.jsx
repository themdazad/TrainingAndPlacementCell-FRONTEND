import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

// Hooks (Paths as per your previous code)
import { useScrollVisibility } from '../../../hooks/useScrollVisibility';
import { useClickOutside } from '../../../hooks/useClickOutside';

// Components (Same folder imports)
import CollegeLogo from './CollegeLogo';
import MobileMenuToggle from './MobileMenuToggle';
import AuthSection from './AuthSection';
import NavigationMenu from './NavigationMenu';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  // Redux state access
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Custom Hooks usage
  const isVisible = useScrollVisibility(50);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Click outside logic to close mobile menu
  useClickOutside(mobileMenuRef, (event) => {
    // Agar click hamburger button par nahi hua hai, tabhi close karein
    if (isMobileMenuOpen && !hamburgerRef.current?.contains(event.target)) {
      setMobileMenuOpen(false);
    }
  });

  return (
    <nav className="sticky top-0 w-full z-[100]">
      <div
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto dark:bg-slate-950 shadow-sm bg-white">
          {/* Main Header: Logo + Actions */}
          <div className="px-6 md:px-12 py-4 flex justify-between items-center">
            <div className="hidden lg:flex items-center">
              <CollegeLogo />
            </div>

            {/* Mobile Toggle Button */}
            <div className="lg:hidden">
              <MobileMenuToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                ref={hamburgerRef}
              />
            </div>

            <div className="flex items-center gap-3">
              {/* User Login/Profile Section */}
              <AuthSection isAuthenticated={isAuthenticated} user={user} />
            </div>
          </div>

          {/* Desktop Navigation Row */}
          <div className="hidden lg:flex px-6 md:px-12 pb-3 pt-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50">
            <NavigationMenu isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
          </div>
        </div>

        {/* Mobile Sidebar/Menu */}
        <MobileMenu
          ref={mobileMenuRef}
          isOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      </div>
    </nav>
  );
}
