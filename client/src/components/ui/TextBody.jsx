import React from "react";
import cn from '@/utils/cn';

const TextBody = ({ onClick, text, className }) => {
  return (
    <p
      onClick={onClick}
      className={cn("font-[500] text-md font-siliguri", className)}
    >
      {text}
    </p>
  );
};

export default TextBody;
