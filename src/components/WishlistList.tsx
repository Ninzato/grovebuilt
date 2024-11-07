import { WishlistedProducts } from "@/types";
import Image from "next/image";
import RemoveFromWishlistButton from "./RemoveFromWishlistButton";

export default function WishlistList({
  data,
  setIsClicked,
  isClicked,
}: {
  data: WishlistedProducts;
  setIsClicked: (value: boolean) => void;
  isClicked: boolean;
}) {
  return (
    <div className="border-b-2">
      <div className="max-w-screen-xl flex flex-col gap-10 justify-center  lg:mx-auto">
        <div className="flex flex-col md:flex-row justify-center h-fit">
          <div className="hover:cursor-pointer">
            <Image
              src={`https://${data.product.images[0]}`}
              alt={data.product.name}
              width={250}
              height={250}
            />
          </div>
          <div className={`flex-grow flex flex-col justify-between gap-5 py-5`}>
            <div className="flex justify-between tracking-widest">
              <div>{data.product.name}</div>
              <div className={`font-bold tracking-wide`}>
                ${data.product.price}
              </div>
            </div>
            <RemoveFromWishlistButton
              data={data.product}
              setIsClicked={setIsClicked}
              isClicked={isClicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
