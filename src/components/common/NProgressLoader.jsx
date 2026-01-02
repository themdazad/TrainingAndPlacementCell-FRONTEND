// src/components/NProgressLoader.jsx
import { useEffect, useRef } from 'react';
import { useLocation, useNavigation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress for smooth, fast loading bar
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
  easing: 'ease',
  speed: 400,
});

export default function NProgressLoader() {
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
    // Only trigger on actual route changes
    if (prevLocation.current !== location.pathname) {
      NProgress.start();
      // Complete quickly since lazy loading handles the actual delay
      NProgress.done();
      prevLocation.current = location.pathname;
    }
  }, [location]);

  return null;
}
