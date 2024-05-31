import React from "react";
import SubTitle from "../ui/SubTitle";
import tranding from "@/data/Tranding.json";

const Tranding = () => {
  return (
    <section className="py-5 max-w-[1250px] mx-auto">
      <div className="flex items-center justify-center pb-4">
        <SubTitle text="Trending Heros!" />
      </div>
      <div className="grid md:grid-cols-9 grid-cols-3 gap-2 py-2">
        {tranding?.map((item, index) => (
          <div
            key={index}
            className="border p-2 rounded bg-gray-100 flex items-center gap-2 flex-col justify-center"
          >
            <img src="/noimage.png" alt="image" className="w-24 h-24 select-none"/>
            <spna className="text-xs text-center">{item?.name}</spna>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tranding;
