"use client";

import { merriweather } from "@/fonts/fonts";
import { GitHub, LinkedIn } from "@mui/icons-material";
import Link from "next/link";

export default function Footer() {
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="bg-gray-100 py-5 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-5 md:px-10 py-4 relative mb-5">
        <ul
          className={`${merriweather.className} text-xl md:text-2xl flex flex-col gap-5`}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Shop</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
        </ul>
      </div>
      <div className="max-w-screen-xl flex flex-col sm:flex-row gap-5 sm:gap-0 items-center justify-between mx-auto px-5 md:px-10 py-4 relative">
        <div className="flex gap-10">
          <GitHub />
          <LinkedIn />
        </div>
        <div className={`${merriweather.className}  flex gap-10`}>
          <p>&copy;Grovebuilt</p>
          <p>&copy;Site by Hacktiv8</p>
        </div>
      </div>
      <div
        onClick={scrollToTop}
        className="absolute top-0 right-5 sm:right-10 bg-black text-white p-2 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] cursor-pointer hover:bg-gray-800"
      >
        <div
          className={
            "flex flex-col justify-center items-center h-full leading-3 sm:leading-4 font-bold text-xs sm:text-base"
          }
        >
          <p>GO</p>
          <p>UP</p>
        </div>
      </div>
    </div>
  );
}

// TAMBAH FOOTER DAN LOGOUT BUTTON DI NAVBAR
