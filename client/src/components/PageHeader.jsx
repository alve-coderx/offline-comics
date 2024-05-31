import React from "react";
import Title from "./ui/Title";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/elements";
// import shop from "../assets/shop.webp";

const PageHeader = ({ title }) => {
  return (
    <div className="bg-gray-200 flex items-center justify-between p-3 h-32 text-center mb-5">
      <IconButton size="sm" variant="outlined" className="rounded-full ">
        <ChevronLeftIcon width={22}/>
      </IconButton>
      <div>
        <p className="text-[#222] text-5xl font-bold">{title}</p>
      </div>
      <div/>
    </div>
  );
};

export default PageHeader;
