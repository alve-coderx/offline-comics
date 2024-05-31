import React from "react";
import Title from "./ui/Title";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/elements";
// import shop from "../assets/shop.webp";

const PageHeader = ({ title }) => {
  return (
    <div className="relative  flex items-center justify-between p-3 h-40 text-center mb-5">
      <div className="absolute rounded-xl inset-0 bg-[url('/title_banner.jpg')] bg-cover bg-no-repeat opacity-50 bg-[#222]"></div>
      <div className="absolute rounded-xl  inset-0 bg-black opacity-50"></div>
      <IconButton size="sm" className="rounded-full bg-primary relative z-10">
        <ChevronLeftIcon width={22} strokeWidth={2} />
      </IconButton>
      <div className="relative z-10">
        <p className="text-primary text-5xl font-bold">{title}</p>
      </div>
      <div />
    </div>
  );
};

export default PageHeader;
