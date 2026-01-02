import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useScrollVisibility } from '../../../hooks/useScrollVisibility';
import { useClickOutside } from '../../../hooks/useClickOutside';

// Aapke naye folder structure se imports
import CollegeLogo from './CollegeLogo';
import MobileMenuToggle from './MobileMenuToggle';
import AuthSection from './AuthSection';
// import MobileMenuToggle from './MobileMenuToggle';

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Custom Hooks
  const isVisible = useScrollVisibility(50);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useClickOutside(mobileMenuRef, () => {
    if (isMobileMenuOpen) setMobileMenuOpen(false);
  });

  return (
    <nav className="sticky top-0 w-full z-[100]">
      <div
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto dark:bg-slate-950">
          {/* Main Header Row */}
          <div className="px-6 md:px-12 py-4 flex justify-between items-center">
            <CollegeLogo />

            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <MobileMenuToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                  ref={hamburgerRef}
                />
              </div>
              <AuthSection isAuthenticated={isAuthenticated} user={user} />
            </div>
          </div>

          {/* Desktop Navigation (Aap isse bhi alag file mein rakh sakte hain) */}
          <div className="hidden lg:flex px-6 md:px-12 pb-3 pt-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200/50">
            {/* Yahan NavigationMenuRoutes ko map kar lijiye */}
          </div>
        </div>

        {/* Mobile Menu logic yahan rahegi */}
      </div>
    </nav>
  );
}
