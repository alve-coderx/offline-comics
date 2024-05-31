"use client";
import React from "react";
import "./Embla.css";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { Banners } from "@/data/Banners";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla py-2 select-none max-w-[1250px]  mx-auto">
      <div className="relative">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {Banners.map((banner, index) => (
              <div key={index} className="embla__slide">
                <img
                  src={banner}
                  className="max-h-[470px] md:object-cover w-full rounded-smv border shadow-lg "
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between w-full top-0 bottom-0 absolute px-2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className="flex items-center justify-center py-2">
        <div className="flex items-center gap-2 ">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
