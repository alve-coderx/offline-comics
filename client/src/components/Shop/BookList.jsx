// src/components/BookList.js
import React, { Suspense } from "react";
import ProductCard from "../ui/ProductCard";
import TextBody from "../ui/TextBody";
import Image from "next/image";
import SubTitle from "../ui/SubTitle";
import ModPagination from "../ui/ModPagination";

const BookList = ({ books, keyWords, selectedFilters, onFilterChange }) => {
  const handleClick = (filterKey, option) => {
    const value = selectedFilters[filterKey] === option ? "" : option;
    onFilterChange(filterKey, value);
  };

  return (
    <div>
      <div className="flex justify-between items-start">
        <div className="flex flex-wrap gap-2 mb-4">
          {keyWords?.map((item, index) => (
            <span
              onClick={() => handleClick("tag", item)}
              key={index}
              className={`${
                selectedFilters.tag === item ? "bg-green-50 rounded" : ""
              } font-siliguri border rounded px-1.5 py-1 text-sm cursor-pointer`}
            >
              {item}
            </span>
          ))}
        </div>
        <div>
          <TextBody text={`Total ${books?.length} results showing`} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 ">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index}>
              <ProductCard book={book} />
            </div>
          ))
        ) : (
          <div className="col-span-4 flex flex-col items-center justify-center text-gray-500">
            <Image src="/loading.webp" width={200} height={200} alt="image" />
            <SubTitle text="No products found" className="text-[#222]" />
          </div>
        )}
      </div>
      <Suspense fallback={"Loading...."}>
        <ModPagination totalPages={10} />
      </Suspense>
    </div>
  );
};

export default BookList;
