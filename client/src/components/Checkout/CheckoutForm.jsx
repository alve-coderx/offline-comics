"use client";
import React, { useEffect, useState } from "react";
import { Option, Select } from "@/components/elements";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import CheckShipping from "../../micro/CheckShipping";
import { TrashIcon } from "@heroicons/react/24/outline";
import TextBody from "../ui/TextBody";
import FlexBox from "../ui/FlexBox";
import OrderPlaceWrapper from "@/wrapper/OrderPlaceWrapper";
import { districts } from "@/data/district";
import ModTextFeild from "../ui/ModTextFeild";
import { useCart } from "@/features/cart/useCart";
import { useDeleteCartItem } from "@/features/cart/cartMutation";
import CheckShipping from "./CheckShipping";
import { useRouter } from "next/navigation";
import Button from "../ui/shared/Button";

const Checkoutform = () => {
  const deleteItem = useDeleteCartItem();
  const { data: cartItems } = useCart();
  // let storedUID = window?.localStorage.getItem("uid"); // Try to get UID from localStorage
  const [selectedValue, setSelectedValue] = useState(50);
  const [shippingFree, setShippingFree] = useState(false);
  const router = useRouter()
  const createOrder = () => {};
  const [selectedOptions, setSelectedOptions] = useState({
    name: "",
    number: "",
    district: "",
    address: "",
    note: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const submitOrder = (e) => {
    // e.preventDefault();
    // if (
    //   selectedOptions.number.length < 11 ||
    //   selectedOptions.number.length > 11
    // ) {
    //   alert("Phone number isn't valid");
    //   return;
    // }
    // if (cartItems?.length < 1) {
    //   toast.error("Cart is empty");
    //   return;
    // }
    // const userorder = {
    //   customer: {
    //     name: selectedOptions.name,
    //     district: selectedOptions.district,
    //     address: selectedOptions.address,
    //     number: selectedOptions.number,
    //   },
    //   orderItems: cartItems,
    //   subtotal: cartItems?.reduce(
    //     (acc, item) =>
    //       acc +
    //       item.quantity *
    //         (item?.discountprice
    //           ? item?.discountprice
    //           : item?.discount
    //           ? getPrice(item.price, item.discount)
    //           : item.price),
    //     0
    //   ),
    //   shipping: selectedValue,
    //   total:
    //     cartItems?.reduce(
    //       (acc, item) =>
    //         acc +
    //         item.quantity *
    //           (item?.discountprice
    //             ? item?.discountprice
    //             : item?.discount
    //             ? getPrice(item.price, item.discount)
    //             : item.price),
    //       0
    //     ) + parseInt(selectedValue),
    //   uid: storedUID,
    //   note: selectedOptions?.note,
    // };
    // createOrder.mutateAsync(userorder);
    router.push("/order-success")
    // localStorage.removeItem("cartItems");
  };

  useEffect(() => {
    cartItems?.map((item) => {
      if (item?.shipping && item?.quantity >= item?.conditionQty) {
        setSelectedValue(0);
        setShippingFree(true);
      }
    });
  }, [cartItems]);
  return (
    <OrderPlaceWrapper>
      <form
        onSubmit={submitOrder}
        className="grid  bg-white items-start md:grid-cols-3 grid-cols-1 gap-5"
      >
        <div className="md:col-span-2 flex flex-col gap-4">
          <TextBody text="বিল সংক্রান্ত তথ্য" />
          <div className="grid grid-cols-1 gap-4 ">
            <ModTextFeild
              required
              name="name"
              placeholder="Name ( আপনার নাম )"
              label="নাম"
              onChange={(e) => handleInputChange(e)}
            />
            <ModTextFeild
              required
              name="number"
              placeholder="Phone Number ( মোবাইল নাম্বার ) "
              label="ফোন নম্বর"
              onChange={(e) => handleInputChange(e)}
            />
            <ModTextFeild
              required
              name="address"
              placeholder="Full Address ( সম্পূর্ণ ঠিকানা ) "
              label="ঠিকানা"
              onChange={(e) => handleInputChange(e)}
            />
            <Select
              className="rounded-sm border bg-gray-50 text-black placeholder:text-black"
              onChange={(e) => {
                setSelectedOptions((prevOptions) => ({
                  ...prevOptions,
                  district: e,
                }));
              }}
              required
              label="District (জেলা) "
            >
              {districts?.map((item, index) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
            <textarea
              className="rounded-sm border border-gray-500 bg-gray-50 text-black placeholder:text-black outline-0 text-sm h-28 w-full p-3"
              placeholder="Note ( বিশেষ দ্রষ্টব্য ) "
              name="note"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <div>
          <div className=" flex flex-col gap-4">
            <TextBody text="এরিয়া সিলেক্ট করুন" />
            <CheckShipping
              shippingFree={shippingFree}
              setSelectedValue={setSelectedValue}
              dcid={50}
              dcod={100}
            />
          </div>
          <div className="flex flex-col gap-4 mt-5">
            <TextBody text="অর্ডার ওভারভিউ" />
            <div className="border p-2">
              {cartItems?.map((item, index) => (
                <FlexBox key={index} className="justify-between py-2">
                  <FlexBox>
                    <TrashIcon
                      onClick={() => deleteItem.mutateAsync(item)}
                      width={15}
                      className="hover:text-red-500"
                    />
                    <TextBody text={item?.name} />
                    <XMarkIcon width={20} strokeWidth={2} />
                    <TextBody text={item?.quantity} />
                  </FlexBox>
                  <TextBody text={item?.subtotal} />
                </FlexBox>
              ))}
              <FlexBox className="mt-5 justify-between">
                <TextBody text="Subtotal" />
                <TextBody
                  text={`${cartItems?.reduce(
                    (acc, item) => acc + item.subtotal,
                    0
                  )}
                ৳`}
                />
              </FlexBox>
              <FlexBox className="mt-5 justify-between">
                <TextBody text="Total" />
                <TextBody
                  text={`${Math.floor(
                    cartItems?.reduce((acc, item) => acc + item.subtotal, 0) +
                      parseInt(selectedValue)
                  )}৳`}
                />
              </FlexBox>
              <Button className="bg-primary w-full mt-10 p-3 text-md text-white ">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </form>
    </OrderPlaceWrapper>
  );
};

export default Checkoutform;
