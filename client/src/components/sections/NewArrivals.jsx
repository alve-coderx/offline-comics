import React from "react";
import books from "@/data/Products.json";
import ProductsSectionWrapper from "@/wrapper/ProductsSectionWrapper";

const NewArrivals = () => {
  return (
    <section >
      <ProductsSectionWrapper title="New Arrivals" items={books} />
    </section>
  );
};

export default NewArrivals;
