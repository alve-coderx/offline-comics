import Menu from "@/components/MyAccount/Menu";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="max-w-[1250px] mx-auto grid grid-cols-5 gap-4">
      <div>
        <Menu />
      </div>
      <div className="md:col-span-4 min-h-[60vh]">{children}</div>
    </div>
  );
};

export default layout;
