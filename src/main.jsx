import "./index.css";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/configureStore.js";
import { PersistGate } from "redux-persist/integration/react";
import AutoThemeListener from "./components/layout/AutoThemeListener";
import { ToastContainer } from "react-toastify";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.js";
import NProgressLoader from "./components/common/NProgressLoader.jsx";

// 👇 This line enables sending cookies with cross-origin requests (Backend can save cookies directly:)
axios.defaults.withCredentials = true;
import AppRoutes from "./routes/index.jsx";

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
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <AutoThemeListener />
        </PersistGate>
      </Provider>
      <ScrollToTop />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
