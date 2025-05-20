import axios from "axios";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/MouseCursorGradientTracking.css";
import "./styles/AnimatedBackground.css";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/shared/Navigation";
import Footer from "./components/shared/Footer";
// contexts
import ProgramsProvider from "./hooks/contexts/google-sheets/programs-provider.jsx";
import AuthProvider from "./hooks/contexts/auth/AuthProvider.jsx";

// Routes
import SharedRoutes from "./routes/shared";
import StudentRoutes from "./routes/student";

function App() {
  return (
    <main className="dark:dark text-foreground bg-background dark:bg-[#111112] ">
      <NavBar />
      {/* Role based routes */}
      <SharedRoutes />
      <StudentRoutes />
      <Footer />
    </main>
  );
}

const Root = () => (
  <BrowserRouter>
    <AuthProvider>
      <ProgramsProvider>
        <App />
      </ProgramsProvider>
    </AuthProvider>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <HeroUIProvider>
    <Root />
  </HeroUIProvider>
);

// 👇 This line enables sending cookies with cross-origin requests
axios.defaults.withCredentials = true;
