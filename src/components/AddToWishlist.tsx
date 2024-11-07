"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types";
import { BookmarkAddOutlined, BookmarkRemove, Sync } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddToWishlist({ data }: { data: Product }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const productId = data._id;
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleClick = async () => {
    try {
      if (!isLoggedIn) router.push("/login");
      setIsClicked(!isClicked);
      const response = await fetch("/api/wishlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productId),
      });

      const res = await response.json();
      toast.success(res.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkIsWishlisted = async () => {
      const response = await fetch(`/api/wishlists/${productId}`, {
        method: "GET",
      });

      const res = await response.json();
      if (res && isLoggedIn) setIsClicked(true);
      else setIsClicked(false);

      setIsLoading(false);
    };

    checkIsWishlisted();
  }, []);

  if (isLoading)
    return (
      <div className="group absolute z-10 top-0 right-0 bg-black p-3  transition-all duration-300 ease-linear cursor-pointer">
        <Sync className="text-white transition-all duration-300 ease-linear animate-spin" />
      </div>
    );
  else
    return (
      <div onClick={handleClick}>
        {isClicked ? (
          <div className="group absolute z-10 top-0 right-0 bg-black p-3 hover:bg-white transition-all duration-300 ease-linear cursor-pointer">
            <BookmarkRemove className="text-white group-hover:text-black transition-all duration-300 ease-linear" />
          </div>
        ) : (
          <div className="group absolute z-10 top-0 right-0 bg-black p-3 hover:bg-white transition-all duration-300 ease-linear cursor-pointer">
            <BookmarkAddOutlined className="text-white group-hover:text-black transition-all duration-300 ease-linear" />
          </div>
        )}
      </div>
    );
}
