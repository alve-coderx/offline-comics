"use client";

import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { Spinner, Rating } from "@/components/elements";
import Numberic from "./Numberic";
import TkSym from "./TkSym";
import Button from "./shared/Button";

const ProductCard = ({ book }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-white group h-full relative transition-all duration-400 tranition-all  flex md:max-w-80 w-full flex-col rounded-xl overflow-hidden">
      <div className="absolute font-siliguri left-0 top-0 z-10 text-sm py-1 px-2 text-white bg-red-500 rounded-br-xl">
        {book?.tag}
      </div>
      <Link
        className="relative group-hover:opacity-70 flex h-64 w-full  overflow-hidden"
        href={`/shop/${book?._id}`}
      >
        <img
          className="absolute select-none top-0 right-0 h-full object-cover rounded-xl border p-2 w-full"
          src={book?.image}
          alt="product image"
        />
      </Link>
      <div className="p-2 group-hover:opacity-70">
        <Link href={`/shop/${book?._id}`}>
          <p className="text-sm h-12 font-[550] font-siliguri">{book?.name}</p>
          <Rating value={Math.round(book.rating)} readonly />
          <p className="text-gray-700 font-[450] text-xs line-clamp-1 ">
            {book?.author_name}
          </p>
          <p className="text-gray-700 font-[450] text-xs">
            {book?.publication}
          </p>
        </Link>
        <div class="mt-2 flex justify-start">
          {book?.discountrate ? (
            <div className="flex  items-center gap-2 ">
              <div className="flex items-center gap-1">
                <TkSym />
                <Numberic
                  text={`${
                    book?.discountprice
                      ? book?.discountprice
                      : getPrice(book?.price, data?.discountrate)
                  }`}
                />
              </div>
              <Numberic
                text={`${book?.price}`}
                className="text-red-500 line-through"
              />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <TkSym />
              <Numberic text={`${book?.price}`} />
            </div>
          )}
        </div>
      </div>
      <Button
        onClick={() => {
          // addToCartEvent();
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false); // Set loading to false after 2 seconds
            handleAddItem(data);
          }, 2000);
        }}
        className="absolute select-none -bottom-16 w-full transition-all duration-300 bg-primary group-hover:bottom-2"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-white font-[450]">Add To Cart</span>
            <ShoppingBagIcon
              width={20}
              strokeWidth={2}
              className="text-white"
            />
          </div>
        )}
      </Button>
    </div>
  );
};

export default ProductCard;
