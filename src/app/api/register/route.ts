import User from "@/db/models/User";
import { errorHandler } from "@/helpers/errorHandler";

export async function POST(request: Request) {
  try {
    const { name, username, email, password } = await request.json();

    await User.register({ name, username, email, password });

    return Response.json({ message: "your account has been created" });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return errorHandler(err);
  }
}
