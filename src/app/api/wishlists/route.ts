import Wishlist from "@/db/models/Wishlist";
import { errorHandler } from "@/helpers/errorHandler";

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) throw { message: "Please login first", status: 401 };

    const productId: string | undefined = await request.json();

    if (!productId) throw { message: "productId is required", status: 400 };

    const newWishlist = {
      userId,
      productId,
    };

    const existingWishlist = await Wishlist.getWishlist(userId, productId);
    if (existingWishlist) {
      await Wishlist.deleteWishlist(userId, productId);
      return Response.json({
        message: "Product has been removed from wishlist",
      });
    } else {
      await Wishlist.addWishlist(newWishlist);
      return Response.json({ message: "Product has been added to wishlist" });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return errorHandler(err);
  }
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) throw { message: "Please login first", status: 401 };
    const wishlists = await Wishlist.getWishlists(userId);
    return Response.json(wishlists);
  } catch (err) {
    return errorHandler(err);
  }
}
