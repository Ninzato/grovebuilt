import Product from "@/db/models/Product";
import { errorHandler } from "@/helpers/errorHandler";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await Product.getProductBySlug(params.slug);

    return Response.json(product);
  } catch (err) {
    return errorHandler(err);
  }
}
