import React from "react";
import EmblaCarousel from "../ui/Carousel/EmblaCarousel";
import NewArrivals from "../sections/NewArrivals";
import Tranding from "../sections/Tranding";
import CategorySlide from "../ui/CategorySlide/CategorySlide";
import CategoryProducts from "../sections/CategoryProducts";
import StaticBanner from "../sections/StaticBanner";
// import CategorySlide from '../ui/CategorySlide/CategorySlide'

const OPTIONS = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <NewArrivals />
      <Tranding />
      <CategorySlide />
      <StaticBanner />
      <CategoryProducts />
    </div>
  );
};

export default Home;
