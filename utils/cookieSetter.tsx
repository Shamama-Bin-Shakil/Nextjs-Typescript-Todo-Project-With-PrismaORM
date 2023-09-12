import { serialize } from "cookie";
import { NextApiResponse } from "next";

const cookieSetter = (res: NextApiResponse, token: string, set: boolean) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

export default cookieSetter;
