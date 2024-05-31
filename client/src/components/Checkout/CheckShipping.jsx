import React, { useState } from "react";
import TextBody from "../ui/TextBody";

const CheckShipping = () => {
  const [selectedOption, setSelectedOption] = useState("outside-dhaka");

  const options = [
    {
      value: "outside-dhaka",
      label: "ঢাকার বাহিরে",
      description: "ডেলিভারি চার্জ ৳90",
    },
    {
      value: "inside-dhaka",
      label: "ঢাকা সিটির ভিতরে",
      description: "ডেলিভারি চার্জ ৳50",
    },
  ];

  const handleSelectOption = (value) => {
    setSelectedOption(value);
  };

  return (
    <div role="radiogroup" aria-labelledby="radio-group-label" >
      <div className="space-y-4">
        {options.map((option) => (
          <div
            key={option.value}
            className={`relative flex items-center px-3 py-1.5 border rounded-lg cursor-pointer ${
              selectedOption === option.value
                ? "border-green-500 bg-quaternary"
                : "border-gray-300"
            }`}
            role="radio"
            aria-checked={selectedOption === option.value}
            tabIndex={selectedOption === option.value ? 0 : -1}
            aria-labelledby={`${option.value}-label`}
            aria-describedby={`${option.value}-desc`}
            onClick={() => handleSelectOption(option.value)}
          >
            <span
              className={`mr-4 flex items-center justify-center w-4 h-4 border rounded-full ${
                selectedOption === option.value
                  ? "border-green-600"
                  : "border-gray-300"
              }`}
              aria-hidden="true"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  selectedOption === option.value
                    ? "bg-green-600"
                    : "bg-transparent"
                }`}
              ></span>
            </span>
            <span>
              <span id={`${option.value}-label`} className="block font-siliguri font-medium">
                {option.label}
              </span>
              <p id={`${option.value}-desc`} className="text-xs text-gray-500 font-siliguri">
                {option.description}
              </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckShipping;
