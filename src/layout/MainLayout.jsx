import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar"; 
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
