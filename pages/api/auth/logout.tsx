import { errorHandler } from "@/middleware/error";
import cookieSetter from "@/utils/cookieSetter";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Not Exist Mehthod == GET Condition
    if (req.method !== "GET") {
      return errorHandler(res, 400, "ONLY GET METHOD IS ALLOWED");
    }

    cookieSetter(res, "", false);

    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error:any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;
