import { errorHandler } from "@/middleware/error";
import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "./checkAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Not Exist Mehthod == POST Condition
    if (req.method !== "GET") {
      return errorHandler(res, 400, "ONLY GET METHOD IS ALLOWED");
    }

    const users = await checkAuth(req, res);

    const userTodo = await prisma.todo.findMany({ where: { userId: users?.id } });

    res.json({ success: true, userTodo });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
