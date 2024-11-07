import Image from "next/image";
import AddToWishlist from "./AddToWishlist";
import { Product } from "@/types";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProductsList({
  data,
  requestProducts,
  hasMore,
}: {
  data: Product[];
  requestProducts: () => void;
  hasMore: boolean;
}) {
  return (
    <div className="relative pb-10">
      <InfiniteScroll
        dataLength={data.length}
        next={requestProducts}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={
          <p className="absolute bg-gray-200 text-black py-2 px-4 mx-auto bottom-0 w-full text-center animate-pulse">
            No more data to load.
          </p>
        }
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-4"
      >
        {data.map((el) => (
          <div key={el._id} className="relative">
            <Link
              href={`products/${el.slug}`}
              className="flex flex-col gap-5 py-4 px-2 md:px-4 hover:shadow-lg h-full transition-all duration-300 ease-linear z-10"
            >
              <Image
                src={`https://${el.images[0]}`}
                alt={el.name}
                width={400}
                height={400}
                className="w-full h-36 md:h-40 lg:h-64 xl:h-96 object-cover"
              />
              <div className="h-fit w-full flex-grow">
                <p>{el.name}</p>
                <p>${el.price}</p>
              </div>
            </Link>
            <AddToWishlist data={el} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
