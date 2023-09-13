import { errorHandler } from "@/middleware/error";
import cookieSetter from "@/utils/cookieSetter";
import prisma from "@/utils/db";
import JWTToken from "@/utils/jsonWebTokenSend";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Not Exist Mehthod == POST Condition
  if (req.method !== "POST") {
    return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
  }
  try {
    const { name, email, password } = JSON.parse(req.body);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      return errorHandler(res, 400, "User Already Exist");
    }

    const userRegister = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        create: new Date(),
      },
    });

    const token: string = JWTToken({ id: userRegister.id });

    cookieSetter(res, token, true);

    res
      .status(200)
      .json({ success: true, message: "User Created Succesfully", token });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
