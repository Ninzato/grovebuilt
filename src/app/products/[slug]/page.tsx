import AddToWishlist from "@/components/AddToWishlist";
import { merriweather, roboto } from "@/fonts/fonts";
import { Product } from "@/types";
import Image from "next/image";
import fetchPonyfill from "fetch-ponyfill";

import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // const product: Product = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.slug}`
  // ).then((res) => res.json());

  const product: Product = await fetchPonyfill()
    .fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.slug}`)
    .then((res) => res.json());

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [`https://${product.images[0]}`],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const response = await fetchPonyfill().fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.slug}`,
    { method: "GET" }
  );

  const data: Product = await response.json();
  const content = data.description.split("\n");

  const wishlisted = await fetchPonyfill().fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists/${data._id}`,
    { method: "GET" }
  );
  const wishlistedRes = await wishlisted.json();
  console.log(wishlistedRes, "<<<");

  return (
    <div>
      <div className="max-w-screen-xl flex flex-col gap-10 justify-center p-5 md:px-10 lg:mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center h-fit relative">
          <div>
            <Image
              src={`https://${data.images[0]}`}
              alt={data.name}
              width={400}
              height={400}
              className="flex-grow"
              priority
            />
          </div>
          <div
            className={`${merriweather.className} flex-grow flex flex-col gap-5 text-center`}
          >
            <div className="text-xl transform -skew-x-12">{data.name}</div>
            <div className="text-sm">
              {data.tags.map((e: string) => `#${e} `)}
            </div>
            <div className={`${roboto.className} font-bold text-lg`}>
              ${data.price}
            </div>
          </div>
          <AddToWishlist data={data} />
        </div>
      </div>
      <div className="bg-gray-200 py-10 px-10">
        <div className="max-w-screen-xl flex flex-col gap-5 justify-center p-5 md:px-10 lg:mx-auto text-center ">
          {content.map((e, i) => (
            <p
              key={i}
              className={`${
                i === 0 ? merriweather.className : ""
              } first:text-2xl first:-skew-x-12 first:tracking-wide leading-7`}
            >
              {e}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
