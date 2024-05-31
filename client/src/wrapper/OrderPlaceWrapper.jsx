"use client";
import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import FlexBox from "@/components/ui/FlexBox";
import SubTitle from "@/components/ui/SubTitle";

const OrderPlaceWrapper = ({ children }) => {
  const pathname = usePathname();
  const steps = [
    { label: "Shopping Cart", slug: "/cart" },
    { label: "Checkout", slug: "/checkout" },
    { label: "Order Complete", slug: "/order-complete" },
  ];
  return (
    <section className="max-w-[1000px] mx-auto">
      <FlexBox className="justify-center my-12">
        <FlexBox className="gap-5">
          {steps?.map((item, index) => (
            <FlexBox
              key={index}
              className={
                pathname === item?.slug
                  ? "text-primary underlined underline-clip border-primary "
                  : ""
              }
            >
              <SubTitle text={item.label} />
              <ChevronRightIcon width={20} strokeWidth={3} />
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>
      <div>{children}</div>
    </section>
  );
};

export default OrderPlaceWrapper;
