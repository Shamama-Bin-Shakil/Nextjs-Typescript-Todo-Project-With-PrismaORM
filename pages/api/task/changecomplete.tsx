import { errorHandler } from "@/middleware/error";
import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../checkAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { iscomplete } = JSON.parse(req.body);
    const d = req.query;
    // Not Exist Mehthod == POST Condition

    if (req.method !== "POST") {
      return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
    }

    const isLoginUser = await checkAuth(req, res);

    const todo = await prisma.todo.update({
      data: {
        complete: iscomplete,
      },
      where: {id: String(d.id)},
    });

    return res
      .status(200)
      .json({ message: "Todo Status Change Successfully", todo });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
