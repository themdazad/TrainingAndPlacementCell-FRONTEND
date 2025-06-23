import axios from "axios";
import  { Suspense, lazy } from "react";
import {ToastContainer} from "react-toastify";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./modules/shared/components/header-footer/navigation-bar.jsx";
import Footer from "./modules/shared/components/header-footer/footer-bar.jsx";  
import NProgressLoader from "./components/NProgressLoader.jsx";

import AuthProvider from "./hooks/contexts/auth/AuthProvider.jsx"; // useContexts

// Lazy load routes
const SharedRoutes = lazy(() => import("./routes/shared-routes.jsx"));
const StudentRoutes = lazy(() => import("./routes/student-routes.jsx"));
const AdminRoutes = lazy(() => import("./routes/admin-routes.jsx"));

function App() {
  return (
    <HeroUIProvider>
      <ToastContainer />
      <main className="text-foreground bg-background dark:bg-neutral-900 min-h-screen">
        <NProgressLoader />        
          <NavBar />
          <SharedRoutes />
          <StudentRoutes />
          <AdminRoutes />
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
