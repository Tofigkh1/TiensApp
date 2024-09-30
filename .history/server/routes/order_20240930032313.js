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

// Handler to get all orders
export async function handlerOrderGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const orders = await getAllData(col);

    const formattedOrders = orders.map(order => ({
      ...order,
      fullname: order.fullname,
      email: order.email,
      delivery_address: order.delivery_address,
      date: order.date,
    }));

    res.status(200).json(response(formattedOrders));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to add a new order
export async function handlerAddOrderPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);

    // Body'den sadece record_id kabul ediliyor
    const { records_id } = req.body;

    // records_id ile records koleksiyonundan veri al
    const recordData = await getDataID(ROUTER.RECORDS, records_id);

    if (!recordData) {
      return res.status(404).json({ error: "Record not found" });
    }

 
    // Order oluştur, record verileri ile
    const order = new Order(
      decodedToken.userId,
      records_id
      new Date() // Sipariş oluşturulma tarihi
    );

    const data = await addData(col, order);

    // Sipariş oluşturulduktan sonra kullanıcı sepetini boşalt
    await uptData(ROUTER.RECORDS, records_id, emptyBasket(decodedToken.userId));

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to delete an order and move it to history
export async function handlerDeleteOrder(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { order_id } = req.body;

    const order = await getDataID(ROUTER.ORDER, order_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Siparişi geçmişe taşı ve siparişler koleksiyonundan sil
    await addData(ROUTER.ORDER_HISTORY, order);
    await deleteData(col, order_id);

    res.status(204).json({ message: "Success", order_id });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
