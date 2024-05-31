import cn from "@/utils/cn";
import React from "react";
const SubTitle = ({ onClick, text, className }) => {
  return (
    <p
      onClick={onClick}
      className={cn("font-[500] md:text-2xl text-md", className)}
    >
      {text}
    </p>
  );
};
export default SubTitle;
