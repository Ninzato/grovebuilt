import Wishlist from "@/db/models/Wishlist";
import { errorHandler } from "@/helpers/errorHandler";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) throw { message: "Please login first", status: 401 };

    const wishlist = await Wishlist.getWishlist(userId, params.productId);
    return Response.json(wishlist);
  } catch (err) {
    return errorHandler(err);
  }
}

export async function POST(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) throw { message: "Please login first", status: 401 };

    await Wishlist.deleteWishlist(userId, params.productId);
    return Response.json({ message: "Product has been removed from wishlist" });
  } catch (err) {
    return errorHandler(err);
  }
}
