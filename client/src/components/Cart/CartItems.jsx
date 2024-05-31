"use client";
import React, { useEffect } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import FlexBox from "../ui/FlexBox";
import { getPrice } from "@/utils/getPrice";
import { updateCart } from "@/features/cart/cart";
import TextBody from "../ui/TextBody";
import { useDecreaseQuantity, useDeleteCartItem, useIncreaseQuantity } from "@/features/cart/cartMutation";

const CartItems = ({ cartItems }) => {
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();
  const removeItem = useDeleteCartItem();

  const handleDeleteTodo = async (item) => {
    await removeItem.mutateAsync(item);
  };
  const purchaseEvent = [
    {
      id: "66128cfec78950e3779d4f41",
      quantity: 3,
      offer: -300,
    },
    {
      id: "66128cfec78950e3779d4f41",
      quantity: 5,
      offer: -500,
    },
  ];
  useEffect(() => {
    if (cartItems?.length > 0) {
      updateCartItems();
    }
  }, [cartItems]);

  const updateCartItems = () => {
    const updatedCartItems = [...cartItems];
    let indexToUpdate;
    purchaseEvent.forEach((event) => {
      let indexToUpdate = updatedCartItems.findIndex(
        (item) => item.id === event.id && item.quantity === event.quantity
      );

      if (indexToUpdate !== -1) {
        updatedCartItems[indexToUpdate].subtotal += event.offer;
        updatedCartItems[indexToUpdate].isUpdated = true;
      }
    });
    if (updatedCartItems[indexToUpdate]?.isUpdated === true) {
      updateCart(updatedCartItems);
    }
  };

  return (
    <div className=" my-2 border">
      <div className="border border-gray-200 md:grid hidden p-3 md:grid-cols-6 grid text-center">
        <TextBody text="Product" className="col-span-2" />
        <TextBody text="Price" />
        <TextBody text="Quantity" />
        <TextBody text="Subtotal" />
      </div>
      {cartItems?.map((item, index) => (
        <div
          key={index}
          className="p-2 border-b border-x grid md:grid-cols-6 grid-cols-1 justify-items-center  items-center gap-5 "
        >
          <FlexBox className="md:col-span-2">
            <img
              src={item?.image}
              alt="item"
              className="w-20 h-20 object-cover"
            />
            <div>
              <TextBody text={item?.name} />
              {item?.variation?.map((item, index) => (
                <div className="flex gap-2 items-center uppercase" key={index}>
                  <TextBody text={`${item?.targetType} :`} />
                  {item?.targetOptionValues?.map((item, index) => (
                    <TextBody key={index} text={item} />
                  ))}
                </div>
              ))}
            </div>
          </FlexBox>
          <TextBody
            text={`${
              item?.runprice
                ? item?.runprice
                : item?.runrate
                ? getPrice(item.price, item.runrate)
                : item.price
            } ৳`}
            className="font-siliguri"
          />
          <FlexBox className="border rounded-sm px-3 py-2 gap-5 justify-between">
            <div
              className="bg-gray-200 rounded-full p-1"
              onClick={() => decreaseQuantity.mutateAsync(item)}
            >
              <MinusIcon width={18} />
            </div>
            <span className="font-siliguri">{item?.quantity}</span>
            <div
              className="bg-gray-200 rounded-full p-1"
              onClick={() => increaseQuantity.mutateAsync(item)}
            >
              <PlusIcon width={18} />
            </div>
          </FlexBox>
          <TextBody
            className="font-semibold font-siliguri"
            text={`${item?.subtotal} ৳`}
          />
          <TrashIcon
            onClick={() => handleDeleteTodo(item)}
            width={20}
            className="cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default CartItems;
