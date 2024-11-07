import Product from "@/db/models/Product";
import { errorHandler } from "@/helpers/errorHandler";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    let products;

    if (limit == "8")
      products = await Product.getFeaturedProducts(Number(limit));
    else products = await Product.getProducts(limit, search, page);

    return Response.json(products);
  } catch (err) {
    return errorHandler(err);
  }
}
