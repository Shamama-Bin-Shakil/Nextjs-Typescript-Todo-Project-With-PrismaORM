import { errorHandler } from "@/middleware/error";
import cookieSetter from "@/utils/cookieSetter";
import prisma from "@/utils/db";
import JWTToken from "@/utils/jsonWebTokenSend";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../checkAuth";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Not Exist Mehthod == POST Condition
  if (req.method !== "GET") {
    return errorHandler(res, 400, "ONLY GET METHOD IS ALLOWED");
  }
  try {
    const isLoginUser = await checkAuth(req, res);
    console.log(isLoginUser);

    res.status(200).json({
      success: true,
        // message: "Login Successfully",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
