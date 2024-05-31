import React from "react";
import SubTitle from "../ui/SubTitle";
import tranding from "@/data/Tranding.json";

const Tranding = () => {
  return (
    <section className="py-5 max-w-[1250px] mx-auto">
      <div className="flex items-center justify-center pb-4">
        <SubTitle text="Trending Heros!" />
      </div>
      <div className="grid md:grid-cols-9 grid-cols-3 gap-1 py-2">
        {tranding?.map((item, index) => (
          <div
            key={index}
            className="p-1.5 border bg-[#FFF8F2] cursor-pointer hover:scale-110 hover transition-all transform-gpu duration-400 drop-shadow-sm flex items-center gap-4 flex-col justify-center"
          >
            <img
              src={item?.image}
              alt="image"
              className="w-24 h-24 select-none"
            />
            <spna className="text-sm font-[450] font-siliguri  text-center">{item?.name}</spna>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tranding;
