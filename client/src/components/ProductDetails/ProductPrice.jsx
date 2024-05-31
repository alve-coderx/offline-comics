import React from "react";
import { getPrice } from "@/utils/getPrice";

const ProductPrice = ({ discount, discountprice, price }) => {
  return (
    <div>
      {discount ? (
        <div>
          <p className="text-xl font-siliguri">
            {discountprice ? discountprice : getPrice(price, discount)}
          </p>
          <p className="line-through text-red-500 font-siliguri">${price}</p>
        </div>
      ) : (
        <p className="text-xl font-siliguri">{`৳${price}`}</p>
      )}
    </div>
  );
};

export default ProductPrice;
