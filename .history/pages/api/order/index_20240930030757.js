import { METHOD } from "../../../server/constant/method";
import { ROUTER } from "../../../server/constant/router";
import {
  handlerAddOrderPOST,
  handlerDeleteOrder,
  handlerOrderGET,
} from "../../../server/routes/order";

export default async function handler(req, res) {
  console.log(req.body);
  
  // Set CORS headers to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Handle CORS preflight
    return;
  }

  switch (req.method) {
    case METHOD.GET:
      await handlerOrderGET(req, res, ROUTER.ORDER);
      return;
    case METHOD.POST:
      await handlerAddOrderPOST(req, res, ROUTER.ORDER);
      return;
    case METHOD.DELETE:
      await handlerDeleteOrder(req, res, ROUTER.ORDER);
      return;
    default:
      res.status(405).end();
  }
}
