import './index.css';
import axios from 'axios';
import { Toaster } from 'sonner';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import AutoThemeListener from './components/layout/AutoThemeListener';
import CookieConsent from 'react-cookie-consent';
import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.js';
import NProgressLoader from './components/common/NProgressLoader.jsx';
import AuthValidator from './components/auth/AuthValidator.jsx';

// This line enables sending cookies with cross-origin requests with axios(Backend can save cookies directly:)
axios.defaults.withCredentials = true;
import AppRoutes from './routes/index.jsx';

export function App() {
  return (
    <HeroUIProvider>
      <NProgressLoader />
      <AppRoutes />
      <CookieConsent
        location="bottom"
        buttonText="Accept Cookies"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="myProjectCookieConsent"
        style={{
          background:
            'linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)',
          backdropFilter: 'blur(10px)',
          padding: '20px 40px',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
        buttonStyle={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '600',
          padding: '10px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
        }}
        declineButtonStyle={{
          background: 'transparent',
          color: '#94a3b8',
          fontSize: '14px',
          fontWeight: '500',
          padding: '10px 24px',
          borderRadius: '8px',
          border: '1px solid rgba(148, 163, 184, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        contentStyle={{
          flex: '1 1 300px',
          margin: '0 20px',
          color: '#e2e8f0',
          fontSize: '15px',
          lineHeight: '1.6',
          textAlign: 'center',
        }}
        expires={150}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '20px' }}>🍪</span>
          <span>
            We use cookies to enhance your experience and analyze site traffic. By continuing to use
            this website, you consent to our use of cookies.
          </span>
        </span>
      </CookieConsent>
    </HeroUIProvider>
  );
}

// NEW: Root component with loading state to show loader until ready
function Root() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthValidator>
          <Toaster position="top-center" richColors />
          <App />
        </AuthValidator>
        <AutoThemeListener />
      </Provider>
      <ScrollToTop />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
