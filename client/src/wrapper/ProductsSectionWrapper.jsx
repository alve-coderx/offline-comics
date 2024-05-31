import React from "react";
import SubTitle from "@/components/ui/SubTitle";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/shared/Button";

const ProductsSectionWrapper = ({ title, items }) => {
  return (
    <section className="md:p-6 p-2 bg-[#FFF8F2] ">
      <div className="max-w-[1250px] mx-auto">
        <div className=" p-2  flex items-center justify-between gap-2">
          <div className="w-auto  pl-2  border-l-2 border-primary border-dashed">
            <SubTitle text={`${title}`} className="font-siliguri text-primary" />
          </div>
          <hr className="border-dashed border-1 w-full border-primary flex-1" />
          <div className="w-auto">
            <Button className=" rounded-full bg-primary ">
              <span className="font-siliguri ">আরও দেখুন</span>
              <ChevronRightIcon width={14} strokeWidth={3} />
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-2 gap-2 py-2">
          {items?.map((book, index) => (
            <div key={index}>
              <ProductCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSectionWrapper;
