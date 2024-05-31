import { Input } from "@/components/elements";
import React from "react";
import TextBody from "./TextBody";

const ModTextFeild = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <label>
        <TextBody text={props?.label} />
      </label>
      <div className="bg-gray-100 drop-shadow-sm rounded border w-full">
        <Input
          {...props}
          className=" border-none rounded-sm placeholder:opacity-100 "
          labelProps={{
            className: "hidden",
          }}
        />
      </div>
    </div>
  );
};

export default ModTextFeild;
