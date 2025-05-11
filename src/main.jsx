
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import Path from "./routes.jsx";
import scrollToTop from "./utils/ScrollToTop.jsx";
import "./styles/index.css";
import "./styles/MouseCursorGradientTracking.css";
import "./styles/AnimatedBackground.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import { Footer } from "./components/header-footer/Footer.jsx";
// contexts
import ProgramsProvider from "./contexts/google-sheets/programs-provider.jsx";
import AuthProvider from "./contexts/auth/AuthProvider.jsx";
import axios from "axios";
import { useEffect } from "react";


ReactDOM.createRoot(document.getElementById("root")).render(
  
  <HeroUIProvider>
    <BrowserRouter>
      <AuthProvider>
        <ProgramsProvider>
          <main className="dark:dark text-foreground bg-background dark:bg-[#111112] ">
            {/* add here navigation bar components */}

            <NavBar />
            <Path /> {/* Router */}
            <Footer />
          </main>
        </ProgramsProvider>
      </AuthProvider>
    </BrowserRouter>
  </HeroUIProvider>
);

// 👇 This line enables sending cookies with cross-origin requests
axios.defaults.withCredentials = true;
