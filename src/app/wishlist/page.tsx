"use client";

import WishlistList from "@/components/WishlistList";
import { merriweather } from "@/fonts/fonts";
import { WishlistedProducts } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const [data, setData] = useState<WishlistedProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const requestProducts = async () => {
      try {
        const response = await fetch("/api/wishlists", {
          method: "GET",
        });

        const wishlists = await response.json();
        setData(wishlists);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error:", err.message);
      }
    };
    requestProducts();
  }, []);

  useEffect(() => {
    if (data.length > 0) setIsLoading(false);
  }, [data]);

  useEffect(() => {
    if (isClicked) {
      window.location.reload();
    }
  }, [isClicked]);

  if (isLoading)
    return (
      <div className="max-w-screen-xl flex justify-center items-center  h-[calc(100vh-72px)] md:h-[calc(100vh-64px)] px-8 mx-auto">
        <div className="shadow-xl border rounded-full py-4 px-8 font-bold tracking-widest animate-pulse">
          Retrieving data, please wait...
        </div>
      </div>
    );
  else {
    console.log(data, "<<<<");
    return (
      <div className="max-w-screen-xl flex flex-col justify-center p-5 md:px-10 lg:mx-auto mt-10">
        <h1 className={`${merriweather.className} text-4xl text-center mb-10`}>
          My Wishlist
        </h1>
        <Link href="/products">
          <button
            className={`font-bold text-sm tracking-wider text-white bg-black py-4 px-8 hover:bg-white hover:text-black hover:shadow-lg w-full active:translate-y-1 lg:mx-auto transition-all duration-300 ease-linear mb-2`}
          >
            ADD MORE PRODUCTS
          </button>
        </Link>
        {data.map((el) => (
          <WishlistList
            key={el._id}
            data={el}
            setIsClicked={setIsClicked}
            isClicked={isClicked}
          />
        ))}
      </div>
    );
  }
}
