import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import Path from "./routes.jsx";
import "./styles/index.css";
import "./styles/MouseCursorGradientTracking.css";
import "./styles/AnimatedBackground.css";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/header-footer/NavigationBar.jsx";
import { Footer } from "./components/header-footer/Footer.jsx";
// contexts
import ProgramsProvider from "./contexts/google-sheets/programs-provider.jsx";
import AuthProvider from "./contexts/auth/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HeroUIProvider>
    <BrowserRouter>
      <AuthProvider>
        <ProgramsProvider>
          <main className="dark:dark text-foreground bg-background dark:bg-[#111112] bg-[url('/images/blur_bg.png')] bg-cover">
            <NavigationBar />
            <Path /> {/* Router */}
            <Footer />
          </main>
        </ProgramsProvider>
      </AuthProvider>
    </BrowserRouter>
  </HeroUIProvider>
);
