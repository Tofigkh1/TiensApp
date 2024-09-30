import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import {
  handlerAddRecordPOST,
  handlerDeleteRecord,
  handlerRecordsGET,
  handlerUpdateRecordPUT,
  handlerUserOrderGET
} from "../../../server/routes/records";

export default async function handler(req, res) {
  console.log("Request Method:", req.method);
  console.log("Request Body:", req.body);
  
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle CORS preflight requests (OPTIONS method)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case METHOD.GET:
        await handlerRecordsGET(req, res, ROUTER.RECORD);
        break;
      case METHOD.POST:
        await handlerAddRecordPOST(req, res, ROUTER.RECORD);
        break;
      case METHOD.PUT:
        await handlerUpdateRecordPUT(req, res, ROUTER.RECORD);
        break;
      case METHOD.DELETE:
        await handlerDeleteRecord(req, res, ROUTER.RECORD);
        break;
      default:
        res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in main handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
