import bcrypt from "bcryptjs";

export const getHashed = (password: string) => bcrypt.hashSync(password, 10);

export const verifyHash = (password: string, hashedPassword: string) =>
  bcrypt.compareSync(password, hashedPassword);
