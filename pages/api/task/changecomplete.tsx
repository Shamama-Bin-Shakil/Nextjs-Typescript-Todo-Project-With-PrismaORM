import { errorHandler } from "@/middleware/error";
import prisma from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "../checkAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { iscomplete } = JSON.parse(req.body);
    const { id } = req.query;
    // Not Exist Mehthod == POST Condition

    console.log(id);
    if (req.method !== "POST") {
      return errorHandler(res, 400, "ONLY POST METHOD IS ALLOWED");
    }

    const isLoginUser = await checkAuth(req, res);

    const todo: { id: string } = await prisma.todo.update({
      where: { 
        id: id
       },
       data: {
        complete: iscomplete
       }
    });

    return res.status(200).json({ message: "Todo Status Change Successfully", todo });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
