export type UserType = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type PayloadType = { email: string; _id: string };

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WishlistedProducts {
  product: Product;
  productId: string;
  userId: string;
  _id: string;
}
