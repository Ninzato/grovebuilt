import EmblaCarousel from "@/components/Carousel";
import { merriweather } from "@/fonts/fonts";
import Link from "next/link";
import { EmblaOptionsType } from "embla-carousel";
import Banner from "@/components/Banner";
import About from "@/components/About";
import { Product } from "@/types";
import fetchPonyfill from "fetch-ponyfill";

export default async function Home() {
  const response = await fetchPonyfill().fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?limit=8`,
    {
      method: "GET",
    }
  );
  const data: Product[] = await response.json();

  const OPTIONS: EmblaOptionsType = { align: "start" };
  const SLIDES = data;
  return (
    <div className="flex flex-col gap-20 mb-20">
      <Banner />
      <div className="text-center flex flex-col gap-5 p-5">
        <h2 className={`${merriweather.className} text-4xl`}>
          Design Inspires
        </h2>
        <p>Build your dream workspace, so you can get your best work done.</p>
        <div className="w-full flex justify-center">
          <div className="group w-fit flex flex-col mt-4">
            <Link
              href="/products"
              className="tracking-widest bg-transparent pb-1 font-bold"
            >
              GET STARTED
            </Link>
            <div
              className={`bg-black after:content-[""] h-[1px] transition-width duration-500 ease-out group-hover:w-1/2 group-hover:mx-auto w-full mx-auto`}
            ></div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl px-5 lg:px-10 xl:mx-auto">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="max-w-screen-xl px-10 sm:px-15 md:px-20 lg:w-3/4 2xl:w-7/12 lg:mx-auto">
        <About />
      </div>
    </div>
  );
}
