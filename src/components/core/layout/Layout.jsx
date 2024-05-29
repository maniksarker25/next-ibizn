import React from "react";
import Footer from "../shared/Footer/Footer";
import MyNavbar from "../shared/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div>
      <MyNavbar />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
