import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/utils/db";

export const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.cookie) {
    return res.status(400).json({ success: false, msg: "Access Denied" });
  }
  const cook = req.headers.cookie?.split("=")[1];
  const useId:any = jwt.verify(cook, process.env.SECRET_KEY!);
  return res.json({useId})

  // const user = await prisma.user.findFirst({
  //   where: { id: useId.id },
  // });
  // return user;
};
