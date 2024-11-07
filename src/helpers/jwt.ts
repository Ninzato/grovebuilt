import jwt from "jsonwebtoken";
import * as jose from "jose";

const SECRET_KEY = process.env.SECRET_KEY as string;

export const generateToken = (payload: { email: string; _id: string }) =>
  jwt.sign(payload, SECRET_KEY);

export const verifyToken = (token: string) => jwt.verify(token, SECRET_KEY);

export const verifyWithJose = async <T>(token: string) => {
  const secret = new TextEncoder().encode(SECRET_KEY);
  const result = await jose.jwtVerify<T>(token, secret);

  return result.payload;
};
