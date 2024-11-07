"use client";

import ProductsList from "@/components/ProductsList";
import Searchbar from "@/components/Searchbar";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState<number>(1);

  const requestProducts = async () => {
    try {
      setHasMore(true);
      let response;

      if (!search) {
        response = await fetch(`/api/products?limit=6&page=${page}`, {
          method: "GET",
          cache: "no-store",
        });
      } else {
        response = await fetch(
          `/api/products?limit=6&page=${page}&search=${search}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
      }

      const products: Product[] = await response.json();

      if (products.length > 0) {
        setData([...data, ...products]);
        if (page === 1) setData(products);
      }

      if (products.length === 0) {
        setHasMore(false);
      }

      setPage(page + 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    requestProducts();
  }, [search]);

  useEffect(() => {
    if (data.length > 0) setIsLoading(false);
  }, [data]);

  if (isLoading)
    return (
      <div className="max-w-screen-xl flex justify-center items-center  h-[calc(100vh-72px)] md:h-[calc(100vh-64px)] px-8 mx-auto">
        <div className="shadow-xl border rounded-full py-4 px-8 font-bold tracking-widest animate-pulse">
          Retrieving data, please wait...
        </div>
      </div>
    );
  else
    return (
      <div className="max-w-screen-xl flex flex-col gap-10 justify-center p-5 md:px-10 lg:mx-auto mb-20">
        <Searchbar setSearch={setSearch} setPage={setPage} />
        <ProductsList
          data={data}
          requestProducts={requestProducts}
          hasMore={hasMore}
        />
      </div>
    );
}
