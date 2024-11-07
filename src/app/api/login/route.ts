import User from "@/db/models/User";
import { verifyHash } from "@/helpers/bcrypt";
import { errorHandler } from "@/helpers/errorHandler";
import { generateToken } from "@/helpers/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await User.findByEmail(email);
    if (!user)
      throw { message: "Invalid email address / password", status: 401 };

    const isValidPassword = verifyHash(password, user.password);
    if (!isValidPassword)
      throw { message: "Invalid email address / password", status: 401 };

    const payload = { email: user.email, _id: user._id.toString() };
    const accessToken = generateToken(payload);

    cookies().set("Authorization", `Bearer ${accessToken}`);

    return Response.json({ message: "Successful login", accessToken });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return errorHandler(err);
  }
}
