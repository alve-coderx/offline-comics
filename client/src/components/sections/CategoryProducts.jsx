import ProductsSectionWrapper from "@/wrapper/ProductsSectionWrapper";
import React from "react";
import categoryProducts from "@/data/CategoryProducts.json";
import books from "@/data/Products.json";

const CategoryProducts = () => {
  return (
    <section>
      {categoryProducts?.map((item, index) => (
        <section className="py-4">
          <ProductsSectionWrapper
            key={index}
            title={item?.category}
            items={books}
          />
          {/* <hr className="border-dashed border-1 border-primary " /> */}
        </section>
      ))}
    </section>
  );
};

export default CategoryProducts;
