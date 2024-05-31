// src/components/BookFilter.js
import React from "react";
import SubTitle from "../ui/SubTitle";

const BookFilter = ({ filters, selectedFilters, onFilterChange }) => {
  const handleClick = (filterKey, option) => {
    const value = selectedFilters[filterKey] === option ? "" : option;
    onFilterChange(filterKey, value);
  };

  return (
    <div className="flex flex-col gap-5 sticky top-4 self-start">
      <SubTitle text="Filter Products" />
      <div >
        {Object.keys(filters).map((filterKey) => (
          <div key={filterKey} className="border p-3">
            <label className="border-b-2 border-primary">{filterKey}</label>
            <div className="flex flex-col gap-2 pt-2">
              {filters[filterKey].map((option) => (
                <div
                  key={option}
                  className={`transition-all cursor-pointer font-siliguri ${
                    selectedFilters[filterKey] === option
                      ? "bg-green-50 p-1 rounded"
                      : ""
                  }`}
                  onClick={() => handleClick(filterKey, option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookFilter;
