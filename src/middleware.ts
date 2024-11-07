import { cookies } from "next/headers";
import { verifyWithJose } from "./helpers/jwt";
import { PayloadType } from "./types";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const auth = cookies().get("Authorization")?.value;

  if (request.nextUrl.pathname.startsWith("/api/wishlists")) {
    if (!auth)
      return Response.json({ message: "Please login first" }, { status: 401 });

    const [type, token] = auth.split(" ");
    if (type != "Bearer")
      return Response.json({ message: "Invalid credential" }, { status: 401 });

    const decoded = await verifyWithJose<PayloadType>(token);

    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers);

    // You can also set request headers in NextResponse.next
    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });

    // Set a new response header `x-hello-from-middleware2`
    response.headers.set("x-user-email", decoded.email);
    response.headers.set("x-user-id", decoded._id);
    return response;
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (!auth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/wishlists/:path*", "/wishlist"],
};
