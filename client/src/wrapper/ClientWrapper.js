"use client";
import Footer from "@/components/ui/Footer";
import MobileNavigation from "@/components/ui/MobileNavigation";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/shared/Sidebar";
import React, { useState } from "react";

const ClientWrapper = ({ children }) => {
  const [navigationBar, setNavigationbar] = React.useState(false);

  return (
    <section>
      <Navbar setNavigationbar={setNavigationbar} />
      <Sidebar
        placement="left"
        setIsDrawerOpen={setNavigationbar}
        isDrawerOpen={navigationBar}
        List={<MobileNavigation setNavigationbar={setNavigationbar} />}
      />
      {children}
      <Footer />
    </section>
  );
};

export default ClientWrapper;
