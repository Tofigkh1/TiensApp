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
      date: order.date
    }));

    res.status(200).json(response(formattedOrders));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to get order history
export async function handlerOrderHistoryGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const histories = await getAllData(col);

    const formattedHistories = histories.map(history => ({
      ...history,
      fullname: history.fullname,
      email: history.email,
      delivery_address: history.delivery_address,
      date: history.date
    }));

    res.status(200).json(response(formattedHistories));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to get user-specific orders
export async function handlerUserOrderGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    const orders = await getQueryData(col, "customer_id", decodedToken.userId);

    const formattedOrders = orders.map(order => ({
      ...order,
      fullname: order.fullname,
      email: order.email,
      delivery_address: order.delivery_address,
      date: order.date
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

    // Extract the new fields from the request body
    const { fullname, email, delivery_address, payment_method, contact, records_id } = req.body;

    const userRecrods = await getDataID(ROUTER.RECORDS, basket_id);

    if (!userBasket.items.length) {
      return res.status(404).json({ error: "Basket is empty!" });
    }

    // Add the new fields to the order along with the current date
    const order = new Order(
        decodedToken.userId,
        fullname,
        email,
        delivery_address,
        userBasket.total_amount,
        contact,
        payment_method,
        userBasket.items,
        new Date() // current date as order creation date
    );

    const data = await addData(col, order);

    // Empty the user’s basket after order is placed
    await uptData(ROUTER.CARD, basket_id, emptyBasket(decodedToken.userId));

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
      return res.status(404).json({ error: "Order is undefined" });
    }

    await addData(ROUTER.ORDER_HISTORY, order);

    await deleteData(col, order_id);
    res.status(204).json({ message: "Success", order_id });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
