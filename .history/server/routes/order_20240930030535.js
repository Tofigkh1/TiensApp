import { emptyBasket } from "../constant/basket";
import { ROUTER } from "../constant/router";
import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { getQueryData } from "../helper/getQueryData";
import { uptData } from "../helper/uptData";
import { Order } from "../models/Order";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";

// Handler to get all records from "records" collection
export async function handlerOrderGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const records = await getAllData(col);

    // Tüm record datalarını response ile dön
    res.status(200).json(response(records));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to add a new order with only records id
export async function handlerAddOrderPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);

    // Body'den sadece record_id kabul ediliyor
    const { record_id } = req.body;

    // record_id ile records koleksiyonundan veri al
    const recordData = await getDataID(ROUTER.RECORDS, record_id);

    if (!recordData) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Order oluştur, record verileri ile
    const order = new Order(
      decodedToken.userId,
      recordData.fullname,
      recordData.email,
      recordData.delivery_address,
      recordData.total_amount,
      recordData.contact,
      recordData.payment_method,
      recordData.items,
      new Date() // current date as order creation date
    );

    const data = await addData(col, order);

    // Empty the user’s basket after order is placed
    await uptData(ROUTER.CARD, record_id, emptyBasket(decodedToken.userId));

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
