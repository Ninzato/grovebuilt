import { Product } from "@/types";

export default function RemoveFromWishlistButton({
  data,
  setIsClicked,
  isClicked,
}: {
  data: Product;
  setIsClicked: (value: boolean) => void;
  isClicked: boolean;
}) {
  const handleClick = async () => {
    await fetch(`/api/wishlists/${data._id}`, { method: "POST" });
  };
  return (
    <div
      onClick={() => {
        handleClick();
        setIsClicked(!isClicked);
      }}
      className="group w-fit ml-auto font-light leading-4 tracking-widest hover:cursor-pointer"
    >
      Remove
      <div
        className={`bg-black after:content-[""] h-[2px] transition-width duration-500 ease-out group-hover:w-1/2 group-hover:mx-auto w-full mx-auto`}
      ></div>
    </div>
  );
}
