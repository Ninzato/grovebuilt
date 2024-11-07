"use client";

import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import "../styles/carousel.css";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import AddToWishlist from "./AddToWishlist";

type PropType = {
  slides: Product[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="embla">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((el) => (
            <div className="embla__slide relative pb-4" key={el._id}>
              <Link
                href={`/products/${el.slug}`}
                className="flex flex-col gap-4 h-full hover:shadow-lg pb-4"
              >
                <div className="embla__content p-4">
                  <Image
                    src={`https://${el.images[0]}`}
                    width={200}
                    height={200}
                    alt="Items"
                    className="object-cover h-full w-full cursor-pointer"
                  />
                </div>
                <div className="font-light px-4">
                  <p>{el.name}</p>
                  <p>${el.price}</p>
                </div>
              </Link>
              <AddToWishlist data={el} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              name="carousel-indicator"
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
