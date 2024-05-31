"use client";
import Footer from "@/components/ui/Footer";
import MobileNavigation from "@/components/ui/MobileNavigation";
import Navbar from "@/components/ui/Navbar";
import ScrollToTop from "@/components/ui/ScrollToTop";
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
      <ScrollToTop />

      <div className=" md:pt-28 pt-2 min-h-[80vh] ">{children}</div>
      <Footer />
    </section>
  );
};

export default ClientWrapper;
