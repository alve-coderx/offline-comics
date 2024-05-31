"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import "./EmblaImage.css";
import Image from "next/image";

const ImageCarousel = (props) => {
  const { slides, options, images } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="image_embla ">
      <div className="image_embla__viewport" ref={emblaMainRef}>
        <div className="image_embla__container">
          {images.map((image, index) => (
            <div className="image_embla__slide" key={index}>
              <Image src={image} width={300} height={300} alt="image"/>
            </div>
          ))}
        </div>
      </div>
      <div className="image_embla-thumbs">
        <div className="image_embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="image_embla-thumbs__container">
            {images.map((image,index) => (
              <Thumb
                key={index}
                image={image}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
