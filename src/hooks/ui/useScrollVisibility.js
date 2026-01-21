import { useState, useEffect } from 'react';

export const useScrollVisibility = (threshold = 50) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);

  return isVisible;
};

// JSDoc Comment
/**
 * Custom React hook to manage visibility based on scroll direction.
 *
 * @param {number} threshold - The scroll threshold to trigger visibility changes.
 * @returns {boolean} isVisible - Indicates if the element should be visible.
 *
 * Usage:
 * const isVisible = useScrollVisibility(100);
 *
 * This hook listens to window scroll events and updates the visibility state
 * based on whether the user is scrolling up or down past a certain threshold.
 */
