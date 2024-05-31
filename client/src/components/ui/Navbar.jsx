"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import {
  Bars3Icon,
  ChevronDownIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import ModLink from "./ModLink";
import Link from "next/link";
import FlexBox from "./FlexBox";
import TextBody from "./TextBody";
import { usePathname } from "next/navigation";
import HeaderWrapper from "@/wrapper/HeaderWrapper";

const Navbar = ({ setNavigationbar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = usePathname();
  const naviagations = [
    { path: "/", name: "Home" },
    { path: "/shop", name: "Shop" },
    { path: "/contact", name: "Contact" },
    { path: "/blog", name: "Blog" },
  ];
  return (
    <HeaderWrapper>
      <nav className="select-none bg-[#F2F4F7] justify-between shadow-sm border-b shadow-md py-3 px-2 ">
        <div className="max-w-[1250px] mx-auto flex items-center justify-between gap-10">
          <Bars3Icon
            className="md:hidden block"
            onClick={() => setNavigationbar(true)}
            width={30}
          />
          <div className="flex items-center gap-4">
            <Logo />
            <div
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              className="border cursor-pointer text-primary px-2.5 py-1.5 rounded-sm md:flex hidden gap-2 itmes-center justify-between"
            >
              <Squares2X2Icon width={24} strokeWidth={2} />
              {/* <span className="font-siliguri"> সকল ক্যাটেগরি</span> */}
              <ChevronDownIcon
                width={15}
                strokeWidth={2}
                className={`hidden transition-transform lg:block ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                width={15}
                strokeWidth={2}
                className={`block transition-transform lg:hidden  ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
          <FlexBox className="gap-6">
            <FlexBox className="gap-4 md:flex hidden">
              {naviagations?.map((item, index) => (
                <Link href={item.path} key={index}>
                  <TextBody
                    text={item.name}
                    className={`${
                      currentPath === item?.path
                        ? "text-primary border-b-2 "
                        : "text-[#222] "
                    } font-[600] uppercase hover:border-b-2 border-primary `}
                  />
                </Link>
              ))}
            </FlexBox>
            <FlexBox className="gap-4 ">
              <Search />
              <div>
                <Link href="/cart">
                  <ShoppingBagIcon width={25} />
                </Link>
              </div>
              <div className="md:flex hidden items-center justify-center gap-1">
                <ModLink label="লগইন" href="/signin" />
                <span>/</span>
                <ModLink label="রেজিস্টার" href="/signup" />
              </div>
            </FlexBox>
          </FlexBox>
        </div>
      </nav>
    </HeaderWrapper>
  );
};

export default Navbar;
