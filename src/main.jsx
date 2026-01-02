import './index.css';
import axios from 'axios';
import { Toaster } from 'sonner';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import AutoThemeListener from './components/layout/AutoThemeListener';
import { ToastContainer } from 'react-toastify';
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <NProgressLoader />
      <AppRoutes />
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
