import { Squares2X2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { MenuItem } from "@/components/elements";
// import { useAllCategories } from "../hooks/useCategories";
import Link from "next/link";
import TextBody from "./TextBody";
import Search from "./Search";

const MobileNavigation = ({ setNavigationbar }) => {
  const { data } = [];

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <XMarkIcon
          className="md:hidden block"
          onClick={() => setNavigationbar((prev) => !prev)}
          width={25}
        />
      </div>
      <Search />
      <div className="flex gap-3 items-center  border-b border-gray-200 py-2 mt-4">
        <TextBody text="Pages" />
      </div>
      <div
        className="flex flex-col gap-5 py-5"
        onClick={() => setNavigationbar((prev) => !prev)}
      >
        <MenuItem>
          <Link href="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/shop">Shop</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/contact">Contact us</Link>
        </MenuItem>
      </div>
      {/* <div>
        <div className="flex gap-3 items-center  border-b border-gray-200 py-2">
          <Squares2X2Icon width={20} />
          <TextBody text="Brows All Category" />
        </div>
        <div className="flex flex-col gap-5 py-5">
          {data?.result?.data?.map((item, index) => (
            <MenuItem key={index}>
              <Link
                to={`/category/${item?._id}`}
                onClick={() => setNavigationbar((prev) => !prev)}
                className="flex items-start gap-5"
              >
                <img
                  src={item?.icon?.url}
                  className="w-5 h-5 object-cover"
                  alt="10"
                />
                <TextBody text={item?.name} />
              </Link>
            </MenuItem>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default MobileNavigation;
