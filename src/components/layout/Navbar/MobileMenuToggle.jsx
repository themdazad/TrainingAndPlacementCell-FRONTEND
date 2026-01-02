import { forwardRef } from 'react';
import { X, Menu } from 'lucide-react';

const MobileMenuToggle = forwardRef(({ isOpen, onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
});
MobileMenuToggle.displayName = 'MobileMenuToggle';

export default MobileMenuToggle;
