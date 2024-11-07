import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

class Wishlist {
  static collection() {
    return database.collection<{ userId: ObjectId; productId: ObjectId }>(
      "wishlists"
    );
  }

  static async addWishlist(payload: { userId: string; productId: string }) {
    const wishlist = {
      userId: new ObjectId(payload.userId),
      productId: new ObjectId(payload.productId),
    };
    const result = await this.collection().insertOne(wishlist);
    return result;
  }

  static async getWishlists(userId: string) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
        },
      },
    ];

    const wishlists = await this.collection().aggregate(agg).toArray();

    //  HABVIS INI GFANTI JADI AGGREGATE BIAR DATA PRODUCTNYA MUNCUL
    return wishlists;
  }

  static async getWishlist(userId: string, productId: string) {
    const wishlist = await this.collection().findOne({
      $and: [
        { userId: new ObjectId(userId) },
        { productId: new ObjectId(productId) },
      ],
    });

    return wishlist;
  }

  static async deleteWishlist(userId: string, productId: string) {
    await this.collection().deleteOne({
      $and: [
        { userId: new ObjectId(userId) },
        { productId: new ObjectId(productId) },
      ],
    });
  }
}

export default Wishlist;
