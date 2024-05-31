import Image from "next/image";
import React from "react";

export const Thumb = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={"image_embla-thumbs__slide".concat(
        selected ? " image_embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="image_embla-thumbs__slide__number"
      >
        <Image src={image} alt="image" width={120} height={120} />
      </button>
    </div>
  );
};
