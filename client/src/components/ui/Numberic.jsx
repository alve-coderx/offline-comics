import cn from "@/utils/cn";
import React from "react";

const Numberic = ({ onClick, text, className }) => {
  return (
    <p
      onClick={onClick}
      className={cn("font-[550] text-md", className)}
    >
      {text}
    </p>
  );
};

export default Numberic;
