import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any) => {
  let message = err.message || "Internal Server Error";
  let status = err.status || 500;

  if (err instanceof z.ZodError) {
    const errMessage = err.issues[0].message;
    message = `${errMessage}`;
    status = 400;
  }

  return Response.json(
    {
      message,
    },
    {
      status,
    }
  );
};
