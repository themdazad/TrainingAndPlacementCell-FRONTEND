import axios from "axios";
import  { Suspense, lazy } from "react";
import {ToastContainer} from "react-toastify";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./modules/shared/components/header-footer/navigation-bar.jsx";
import Footer from "./modules/shared/components/header-footer/Footer.jsx";  
import Loader from "./components/Loader.jsx";
// contexts
import ProgramsProvider from "./hooks/contexts/google-sheets/programs-provider.jsx";
import AuthProvider from "./hooks/contexts/auth/AuthProvider.jsx";

// Lazy load routes
const SharedRoutes = lazy(() => import("./routes/shared-routes.jsx"));
const StudentRoutes = lazy(() => import("./routes/student-routes.jsx"));
const AdminRoutes = lazy(() => import("./routes/admin-routes.jsx"));

function App() {
  return (
    <HeroUIProvider>
      <ToastContainer />
      <main className="text-foreground bg-background dark:bg-neutral-900 min-h-screen">
        <Suspense fallback={<Loader />}>
          <NavBar />
          <SharedRoutes />
          <StudentRoutes />
          <AdminRoutes />
          <Footer />
        </Suspense>
      </main>
    </HeroUIProvider>
  );
}

// NEW: Root component with loading state to show loader until ready
function Root() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgramsProvider>
          <App />
        </ProgramsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

// 👇 This line enables sending cookies with cross-origin requests (Backend can save cookies directly:)
axios.defaults.withCredentials = true;
