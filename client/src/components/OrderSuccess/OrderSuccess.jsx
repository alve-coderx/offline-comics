import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";
import Suuccess from "../SuccessAnimation/Suuccess";
import FlexBox from "../ui/FlexBox";
import Button from "../ui/shared/Button";

const OrderSuccess = () => {
  return (
    <FlexBox className="relative items-center justify-center py-5 w-full bg-gray-50">
      <FlexBox className="gap-5 flex-col h-full bg-white border shadow-sm py-2">
        <FlexBox className="gap-5 p-4  border-dashed border-2 border-green-500">
          <div className="bg-green-50 p-3 rounded-full border ">
            <CheckIcon width={40} strokeWidth={5} className="text-green-500" />
          </div>
          <span className="text-green-500">
            Thank you. Your order has been received.
          </span>
        </FlexBox>
        <Suuccess />
        <div className="p-3 flex flex-col justify-center space-y-2 mb-2">
          <p className="text-lg font-[600]">Payment and Shipping Details </p>
          <FlexBox className="justify-center">
            <p className="text-slate-600">Track Id</p>
            <p>#dfasdasd </p>
          </FlexBox>
          <FlexBox className="justify-center">
            <p className="text-slate-600">Payment Status</p>
            <p>NOT PAID</p>
          </FlexBox>
          <FlexBox className="justify-center">
            <p className="text-slate-600">Order Date</p>
            <p>asdasdasd</p>
          </FlexBox>
          <FlexBox className="justify-center">
            <p className="text-slate-600">Total Amount</p>
            <p>asdasdasd ৳</p>
          </FlexBox>
        </div>
        <Button>View Order</Button>
      </FlexBox>
    </FlexBox>
  );
};

export default OrderSuccess;
