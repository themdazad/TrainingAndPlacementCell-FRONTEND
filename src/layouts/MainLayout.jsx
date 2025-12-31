import NavBar from "../components/header-footer/navigation-bar";
import Footer from "../components/header-footer/footer-bar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    // will maintain the full height of the screen
    <div className="flex flex-col min-h-screen"> 
      <NavBar />
      <main className="text-foreground bg-background dark:bg-slate-950 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
