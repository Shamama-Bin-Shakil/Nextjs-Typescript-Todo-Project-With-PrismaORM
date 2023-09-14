import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/utils/db";

export const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.token) {
    return res.status(400).json({ success: false, msg: "Access Denied" });
  }
  const cook:any = req.headers.token;
  const userId:any =  jwt.verify(cook, process.env.SECRET_KEY!);

  const user = await prisma.user.findFirst({
    where: { id: userId.id },
  });
  return user;
};
