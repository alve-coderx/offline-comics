"use client";
import { StaticBanners } from "@/data/Banners";
import Image from "next/image";
import React from "react";

const StaticBanner = () => {
  return (
      <section className="grid md:grid-cols-2 gap-4 grid-cols-1 justify-items-center py-5 ">
        {StaticBanners?.map((item, index) => (
          <Image
            src={item}
            alt="item"
            width={576}
            height={219}
            className="rounded-lg max-w-[576px] w-full max-h-[219px] object-cover"
          />
        ))}
      </section>
  );
};

export default StaticBanner;
