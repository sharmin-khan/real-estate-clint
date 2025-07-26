import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import SaveUserToDB from "../hooks/SaveUserToDB";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <SaveUserToDB />  */}
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
