import cn from "@/utils/cn";
import React from "react";

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex gap-2 bg-primary rounded-full text-white items-center justify-center px-4 py-2 font-[500] ",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
