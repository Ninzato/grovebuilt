import { UserType } from "@/types";
import { database } from "../config/mongodb";
import { z } from "zod";
import { getHashed } from "@/helpers/bcrypt";

const UserTypeSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }),
  email: z.string().email("Incorrect email format"),
  password: z.string().min(5, { message: "Minimum password length is 5" }),
});

class User {
  static collection() {
    return database.collection("users");
  }

  static async register(user: UserType) {
    UserTypeSchema.parse(user);

    const existingUser = await this.collection().findOne({
      $or: [{ username: user.username }, { email: user.email }],
    });

    if (existingUser)
      throw { message: "Username / email has been taken", status: 400 };

    user.password = getHashed(user.password);

    return this.collection().insertOne(user);
  }

  static async findByEmail(email: string) {
    const user = await this.collection().findOne({ email });
    return user;
  }
}

export default User;
