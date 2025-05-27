import axios from "axios";
import React, { Suspense, lazy, useState, useEffect } from "react";
import {ToastContainer} from "react-toastify";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/MouseCursorGradientTracking.css";
import "./styles/AnimatedBackground.css";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/shared/Navigation";
import Footer from "./components/shared/Footer";
import Loader from "./components/ui/Loader.jsx";
// contexts
import ProgramsProvider from "./hooks/contexts/google-sheets/programs-provider.jsx";
import AuthProvider from "./hooks/contexts/auth/AuthProvider.jsx";

// Lazy load routes
const SharedRoutes = lazy(() => import("./routes/shared"));
const StudentRoutes = lazy(() => import("./routes/student"));

function App() {
  return (
    <HeroUIProvider>
       <ToastContainer />
      <main className="text-foreground bg-background dark:bg-[#111112] min-h-screen">
        <Suspense fallback={<Loader />}>
          <NavBar />
          <SharedRoutes />
          <StudentRoutes />
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

// 👇 This line enables sending cookies with cross-origin requests
axios.defaults.withCredentials = true;
