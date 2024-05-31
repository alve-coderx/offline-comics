import cn from "@/utils/cn";
import React from "react";

const FlexBox = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
};

export default FlexBox;
