import { merriweather } from "@/fonts/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div>
      <div className="relative flex justify-center md:justify-end items-center md:items-end">
        <Link href="/">
          <Image
            src="/img/banner.jpg"
            width={2560}
            height={400}
            alt="Banner picture of desk setup"
            className="object-cover h-[400px]"
            priority={true}
          />
        </Link>
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="absolute w-full z-2 text-white text-center md:text-right p-10">
          <div className="max-w-screen-xl mx-auto">
            <h2 className={`${merriweather.className} text-5xl`}>The Desk</h2>
            <p className="font-light">Available now in walnut, oak and maple</p>
            <div className="w-full flex justify-center md:justify-end">
              <div className="group w-fit flex flex-col mt-4">
                <Link
                  href="/"
                  className="text-xs tracking-widest bg-transparent pb-1 font-bold"
                >
                  LEARN MORE
                </Link>
                <div
                  className={`bg-white after:content-[""] h-[1px] transition-width duration-500 ease-out group-hover:w-1/2 group-hover:mx-auto w-full mx-auto`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
