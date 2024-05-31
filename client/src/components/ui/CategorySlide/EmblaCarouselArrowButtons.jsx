import { IconButton } from "@/components/elements";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useState } from "react";
export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <IconButton
      type="button"
      variant="filled"
      color="deep-orange"
      className="rounded-full"
      {...restProps}
    >
      <ChevronLeftIcon width={16} strokeWidth={3} />
      {children}
    </IconButton>
  );
};

export const NextButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <IconButton
      type="button"
      variant="filled"
      color="deep-orange"
      className="rounded-full"
      {...restProps}
    >
      <ChevronRightIcon width={16} strokeWidth={3} />

      {children}
    </IconButton>
  );
};
