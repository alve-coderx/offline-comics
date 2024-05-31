import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        width={150}
        height={60}
        className="md:w-36 w-32"
      />
    </Link>
  );
};

export default Logo;
