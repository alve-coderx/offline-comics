import Link from "next/link";
import React from "react";

const ModLink = ({ href, label }) => {
  return (
    <Link
      className="font-siliguri hover:text-primary hover:underline"
      href={href}
    >
      {label}
    </Link>
  );
};

export default ModLink;
