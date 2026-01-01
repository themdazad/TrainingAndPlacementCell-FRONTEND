import Navbar from "../components/layout/Navbar/Navbar.jsx";
import Footer from "../components/layout/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";  

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
      <main className="text-foreground bg-background dark:bg-slate-950 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
