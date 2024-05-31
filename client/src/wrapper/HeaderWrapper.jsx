"use client";
import React, { useEffect, useState } from "react";

const HeaderWrapper = ({ children }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 20);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <nav
      className={`z-50 bg-white md:fixed transition-all rounded-none left-0 right-0 duration-500 ${
        visible ? "top-0" : "-top-24"
      }`}
    >
      {children}
    </nav>
  );
};

export default HeaderWrapper;
