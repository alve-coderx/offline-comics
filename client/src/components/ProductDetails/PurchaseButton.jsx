"use client";

import React, { useState } from "react";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { decreaseQuantity, increaseQuantity } from "@/utils/qtyHandler";
import { Spinner } from "@/components/elements";
import FlexBox from "../ui/FlexBox";
import { useAddItemToCart } from "@/features/cart/cartMutation";
import { useRouter } from "next/navigation";
import Button from "../ui/shared/Button";

const PurchaseButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const { name, price, discount_price, discount_rate, images, _id } = product;
  const addItemMutation = useAddItemToCart();
  const router = useRouter();

  const handleAddItem = async (redirect) => {
    setIsItemAdded(true);
    const product = {
      id: _id,
      name,
      price,
      discount_price,
      discount_rate,
      image: images[0],
      quantity,
    };
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsItemAdded(false); // Set loading to false after 2 seconds
    await addItemMutation.mutateAsync(product);

    if (redirect) {
      router.push("/cart");
    }
  };
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-x-1 gap-y-4">
      <div className="border max-w-32 w-full border-gray-200 p-2 gap-5 flex items-center justify-between rounded-full">
        <div
          className="bg-gray-200 rounded-full p-1"
          onClick={() => decreaseQuantity(setQuantity)}
        >
          <MinusIcon width={18} />
        </div>
        <div>
          <span>{quantity}</span>
        </div>
        <div
          className="bg-gray-200 rounded-full p-1"
          onClick={() => increaseQuantity(setQuantity)}
        >
          <PlusIcon width={18} />
        </div>
      </div>
      <div className="md:col-span-3">
        <Button
          // disabled={!isStock}
          onClick={handleAddItem}
          className="bg-primary w-[50%] text-white max-w-64 rounded-full p-2"
        >
          {isItemAdded ? (
            <FlexBox className="justify-center">
              <Spinner />
            </FlexBox>
          ) : (
            <FlexBox className="justify-center">
              <ShoppingBagIcon width={25} /> <span>Add To Cart</span>
            </FlexBox>
          )}
        </Button>
      </div>
      <div className="md:col-span-4">
        <Button
          // disabled={!isStock}
          onClick={() => handleAddItem(true)}
          className="bg-secondary w-[50%] text-white max-w-64 rounded-full p-2"
        >
          {isItemAdded ? (
            <FlexBox className="justify-center">
              <Spinner />
            </FlexBox>
          ) : (
            <FlexBox className="justify-center">
              <ShoppingBagIcon width={25} /> <span>Buy Now</span>
            </FlexBox>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PurchaseButton;
