import cn from '@/utils/cn';
import React from 'react'

const Title = ({ onClick, text, className }) => {
    return (
      <p
        onClick={onClick}
        className={cn("font-[500] md:text-4xl text-md", className)}
      >
        {text}
      </p>
    );
  };

export default Title