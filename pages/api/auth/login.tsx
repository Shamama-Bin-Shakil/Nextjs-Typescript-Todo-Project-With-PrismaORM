import { errorHandler } from "@/middleware/error";
import cookieSetter from "@/utils/cookieSetter";
import prisma from "@/utils/db";
import JWTToken from "@/utils/jsonWebTokenSend";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Not Exist Mehthod == POST Condition
  if (req.method !== "POST") {
    return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
  }
  try {
    // const { email, password } = JSON.parse(req.body);

    // const user = await prisma.user.findFirst({
    //   where: { email },
    // });

    // if (!user) {
    //   return errorHandler(res, 400, "Invalid Crendential");
    // }

    // const isPasswordMatch = await bcrypt.compare(password, user.password);

    // if (!isPasswordMatch) {
    //   return errorHandler(res, 400, "Invalid Crendential");
    // }

    // const token: string = JWTToken({ id: user.id });

    // cookieSetter(res, token, true);

    res.status(200).json({
        success: true,
        message: "Login Successfully",
        token
    })
  } catch (error:any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
