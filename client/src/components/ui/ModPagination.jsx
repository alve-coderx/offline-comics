"use client";
import React, { useCallback } from "react";
import { Button, IconButton } from "@/components/elements";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ModPagination({ totalPages }) {
  const [active, setActive] = React.useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
    className: "rounded-full border",
    size: "md",
    onClick: () => {
      setActive(index);
      router.push(pathname + "?" + createQueryString("page", index));
    },
  });

  const next = () => {
    if (active === 5) return;
    router.push(pathname + "?" + createQueryString("page", active + 1));
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    router.push(pathname + "?" + createQueryString("page", active - 1));
    setActive(active - 1);
  };
  const renderPagination = () => {
    const pagesArray = [];
    const start = active > 1 ? active - 1 : active; // Calculate starting page number

    for (let i = start; i <= Math.min(start + 2, totalPages); i++) {
      pagesArray.push(
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }
    return pagesArray;
  };
  return (
    <div className="flex items-center justify-between gap-4 border my-4 p-2 bg-gray-50">
      <Button
        size="sm"
        variant="text"
        className="flex items-center gap-2 "
        onClick={prev}
        disabled={active === 1}
      >
        <ChevronLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">{renderPagination()}</div>
      <Button
        size="sm"
        variant="text"
        className="flex items-center gap-2 "
        onClick={next}
        disabled={active === 5}
      >
        <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
