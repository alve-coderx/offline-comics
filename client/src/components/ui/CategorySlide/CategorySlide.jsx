"use client";
import React from "react";
import "./Slide.css";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Trandings from "@/data/Tranding.json";
import SubTitle from "../SubTitle";

const OPTIONS = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const CategorySlide = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="py-5 select-none md:max-w-[1250px] md:mx-auto">
      <div className="flex items-center justify-center pb-4">
        <SubTitle text="জনপ্রিয় বিষয়" className="font-siliguri" />
      </div>
      <section className="category_embla relative">
        <div className="category_embla__viewport" ref={emblaRef}>
          <div className="category_embla__container">
            {Trandings.map((item, index) => (
              <div
                className="category_embla__slide flex-none md:w-[20%] w-[50%]"
                key={index}
              >
                <div className="border p-3 rounded-lg border-primary font-siliguri text-center font-semibold">
                  {item?.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between w-full top-0 bottom-0 absolute p-1">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </section>
    </section>
  );
};

export default CategorySlide;
