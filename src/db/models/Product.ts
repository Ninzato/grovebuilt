import { database } from "../config/mongodb";

class Product {
  static collection() {
    return database.collection("products");
  }

  static async getProducts(
    limit: string | null,
    search: string | null,
    page: string | null
  ) {
    const query: { $and?: { name: { $regex: string; $options: string } }[] } =
      {};
    if (search) {
      const arr = search
        .split(" ")
        .map((el) => ({ name: { $regex: el, $options: "i" } }));
      query.$and = arr;
    }

    const offset = limit ? Number(limit) : 3;
    const skip = ((page ? Number(page) : 1) - 1) * offset;

    const products = await this.collection()
      .find(query)
      .skip(skip)
      .limit(offset)
      .toArray();
    return products;
  }

  static async getFeaturedProducts(query: number) {
    const products = await this.collection().find().limit(query).toArray();
    return products;
  }

  static async getProductBySlug(slug: string) {
    const product = await this.collection().findOne({ slug });
    if (!product) throw { message: "Product is not found", status: 404 };
    return product;
  }
}

export default Product;
