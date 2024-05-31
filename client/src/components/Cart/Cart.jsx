"use client";
// import CartItems from "@/app/components/mega/CartItems/CartItems";
import { ArrowRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import FlexBox from "../ui/FlexBox";
import OrderPlaceWrapper from "@/wrapper/OrderPlaceWrapper";
import TextBody from "../ui/TextBody";
import { useCart } from "@/features/cart/useCart";
import CartItems from "./CartItems";
import Button from "../ui/shared/Button";

const Cart = () => {
  const { data } = useCart();

  const emptyCart = () => {};

  return (
    <div className="min-h-[60vh] ">
      {data?.length < 1 ? (
        <div className="flex flex-col h-[50vh] gap-4 items-center justify-center">
          <img
            src="/cart-empty.svg"
            className="w-64 h-64"
            alt="attribution illustration"
          />
          <TextBody text="Your cart is currently empty." />
          <Button className="bg-primary text-white max-w-64 9 w-full">
            Return To Shop
          </Button>
        </div>
      ) : (
        <OrderPlaceWrapper>
          <CartItems cartItems={data} />
          <div className="flex items-center gap-2 justify-between py-5 px-2">
            <FlexBox>
              <Link href="/products">
                <Button className="flex gap-2 bg-quaternary text-secondaryT items-center">
                  Continue Shopping
                  <ShoppingBagIcon width={18} />
                </Button>
              </Link>
              <Button
                onClick={() => emptyCart.mutateAsync()}
                className="bg-primary text-white"
              >
                Clear Cart
              </Button>
            </FlexBox>
            <Link href="/checkout">
              <Button >
                Proceed To Checkout
                <ArrowRightIcon width={18} />
              </Button>
            </Link>
          </div>
        </OrderPlaceWrapper>
      )}
    </div>
  );
};

export default Cart;
