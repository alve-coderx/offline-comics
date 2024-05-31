import React from "react";
import SubTitle from "../ui/SubTitle";
import ImageCarousel from "../ui/ImageCarousel/ImageCarousel";
import { bookDetails } from "@/data/Product";
import TextBody from "../ui/TextBody";
import TkSym from "../ui/TkSym";
import { FaStar } from "react-icons/fa";
import PurchaseButton from "./PurchaseButton";
import { Rating } from "@/components/elements";

const ProductDetails = () => {
  const OPTIONS = {};
  const SLIDE_COUNT = 10;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  let data = bookDetails;
  return (
    <section>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 max-w-[1150px] mx-auto py-2">
        {/* col-1 */}
        <div className="border-b ">
          <ImageCarousel
            images={data?.images}
            slides={SLIDES}
            options={OPTIONS}
          />
        </div>
        {/* col-2 */}
        <div className="border-b ">
          <div className="py-4 flex flex-col gap-5">
            <SubTitle text={data?.name} />
            <div className="flex items-center gap-4 ">
              <div>
                {data.discount_rate > 0 ? (
                  <div className="flex items-center gap-2">
                    <TkSym />
                    <TextBody
                      className="md:text-xl "
                      text={
                        data?.discount_price
                          ? data?.discount_price
                          : getPrice(price, data?.discount_rate)
                      }
                    />
                    <TextBody
                      className="line-through md:text-lg text-sm text-red-500 font-siliguri"
                      text={data?.price}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <TkSym />
                    <TextBody className="md:text-2xl " text={data?.price} />
                  </div>
                )}
              </div>
              <div className="px-1.5 py-1 rounded bg-gray-100 flex items-center gap-2">
                <FaStar width={25} className="text-orange-300" />
                {data?.rating}
              </div>
            </div>
            <PurchaseButton product={bookDetails}/>
            <div>
              <div className="flex items-center gap-2">
                <TextBody text="Details of this product" />
                <hr className="w-full flex-1" />
              </div>
              <div
                className="text-gray-600 text-sm pt-4"
                dangerouslySetInnerHTML={{
                  __html: data?.short_description,
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <TextBody text="Features & Policies of this product" />
                <hr className="w-full flex-1" />
              </div>
              <div className="flex flex-col gap-3 border-l-4 border-primary pl-2 mt-5">
                {Object.entries(data?.meta_details).map(([key, value]) => (
                  <div
                    className="bg-gray-100 py-2  px-4 rounded-full "
                    key={key}
                  >
                    <span className="text-gray-800 text-sm uppercase">
                      {key}
                    </span>{" "}
                    : <span className="text-gray-700 text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* col-3 */}
        <div>
          {/* <AdditionalDetails data={data} /> */}
          <div className="flex flex-wrap gap-2 py-5">
            {data?.keywords?.map((item, index) => (
              <span
                className="text-xs border border-gray-400 p-1 rounded text-gray-700 font-[450]"
                key={index}
              >
                #{item}
              </span>
            ))}
          </div>
        </div>
        {/* col-4 */}
        <div>
          <div className="flex items-center gap-2">
            <TextBody text="Reviews" />
            <hr className="w-full flex-1" />
          </div>
          <div className="flex flex-col gap-2 divide-y">
            {data?.reviews?.map((item, index) => (
              <div className="py-3">
                <TextBody text={item?.reviewer} />
                <Rating value={Math.round(item?.rating)} readonly />
                <p className="text-sm text-gray-600">{item?.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
