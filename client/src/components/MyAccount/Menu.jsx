"use client";
import React from "react";
import {
  ArrowRightStartOnRectangleIcon,
  InboxIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TextBody from "../ui/TextBody";

const RenderMenuLink = ({ name, icon, action }) => {
  return (
    <button
      onClick={() => action()}
      className="text-sm font-[500] flex items-center gap-2 w-full transition-all bg-[#FFFFFF] hover:text-gray-700"
    >
      {icon}
      {name}
    </button>
  );
};
const Menu = () => {
  const router = useRouter();
  const { data } = {};
  const logout = () => {};

  return (
    <div className="grid grid-cols-1 items-start gap-5 border-r h-full">
      <div className="flex items-center gap-2 p-3 flex-col bg-gray-50">
        <Image
          src="/usericon.png"
          className="rounded-full"
          alt="user"
          width={70}
          height={70}
        />
        <TextBody text="Shad Islam" />
      </div>
      <RenderMenuLink
        name="My Profile"
        icon={<UserIcon width={15} />}
        action={() => {
          router.push("/myaccount/profile");
        }}
      />
      <RenderMenuLink
        name="My Orders"
        icon={<InboxIcon width={15} />}
        action={() => {
          router.push("/myaccount/myorders");
        }}
      />
      <RenderMenuLink
        name="Reset Password"
        icon={<KeyIcon width={15} />}
        action={() => {
          router.push("/myaccount/reset-password");
        }}
      />
      {data?.user?.role == "admin" && (
        <RenderMenuLink
          name="Dashboard"
          icon={<Square3Stack3DIcon width={15} />}
          action={() => {
            router.push("/admin/dashboard");
          }}
        />
      )}
      <RenderMenuLink
        name="Logout"
        icon={<ArrowRightStartOnRectangleIcon width={15} />}
        action={() => {
          logout.mutateAsync();
        }}
      />
    </div>
  );
};

export default Menu;
