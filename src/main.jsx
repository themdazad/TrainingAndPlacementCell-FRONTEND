import axios from "axios";
import {ToastContainer} from "react-toastify";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/header-footer/navigation-bar.jsx";
import Footer from "./components/header-footer/footer-bar.jsx";  
import NProgressLoader from "./components/common/NProgressLoader.jsx";

import AuthProvider from "./hooks/contexts/auth/AuthProvider.jsx"; // useContexts
import AppRoutes from "./routes/index.jsx";

function App() {
  return (
    <HeroUIProvider>
      <ToastContainer />
      <main className="text-foreground bg-background dark:bg-slate-950 min-h-screen">
        <NProgressLoader />        
          <NavBar />
          <AppRoutes />
          <Footer />
      </main>
    </HeroUIProvider>
  );
}

// NEW: Root component with loading state to show loader until ready
function Root() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <App />
       </AuthProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

// 👇 This line enables sending cookies with cross-origin requests (Backend can save cookies directly:)
axios.defaults.withCredentials = true;
