import { getAllData } from "../helper/getAllData";
import { response } from "../utils/response";
import { verifyJWT } from "../utils/jwt";
import { addData } from "../helper/addData";
import { uptData } from "../helper/uptData";
import { getDataID } from "../helper/getDataID";
import { ROUTER } from "../constant/router";
import { emptyBasket } from "../constant/basket";
import { getDataID } from "../helper/getDataID";
import { ROUTER } from "../constant/router";

// Handler to get all records
export async function handlerRecordsGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const records = await getAllData(col);

    const formattedRecords = records.map(record => ({
      ...record,
      fullname: record.fullname,
      email: record.email,
      delivery_address: record.delivery_address,
      total_amount: record.total_amount,
      contact: record.contact,
      payment_method: record.payment_method,
      items: record.items,
      date: record.date
    }));

    res.status(200).json(response(formattedRecords));
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}


// Handler to add a new record
export async function handlerAddRecordPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);

    const { fullname, email, delivery_address, payment_method, contact, basket_id } = req.body;

    if (!fullname || !email || !delivery_address || !basket_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userBasket = await getDataID(ROUTER.CARD, basket_id);
    
    if (!userBasket || !userBasket.items.length) {
      return res.status(404).json({ error: "Basket is empty!" });
    }

    const record = {
      userId: decodedToken.userId,
      fullname,
      email,
      delivery_address,
      total_amount: userBasket.total_amount,
      contact,
      payment_method,
      items: userBasket.items,
      date: new Date(),
      createdAt: new Date()
    };

    const data = await addData(col, record);

    // Empty the user’s basket after the record is added
    await uptData(ROUTER.CARD, basket_id, emptyBasket(decodedToken.userId));

    res.status(201).json(data);
  } catch (error) {
    console.error("Error adding record:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}




// Handler to update a record
export async function handlerUpdateRecordPUT(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { record_id, fullname, email, delivery_address, payment_method, contact, basket_id } = req.body;

    if (!record_id || !fullname || !email || !basket_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userBasket = await getDataID(ROUTER.CARD, basket_id);

    if (!userBasket.items.length) {
      return res.status(404).json({ error: "Basket is empty!" });
    }

    const updatedRecord = {
      fullname,
      email,
      delivery_address,
      total_amount: userBasket.total_amount,
      contact,
      payment_method,
      items: userBasket.items,
      date: new Date()
    };

    await uptData(col, record_id, updatedRecord);

    res.status(200).json({ message: "Record updated successfully", record_id });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}


// Handler to delete a record
export async function handlerDeleteRecord(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { record_id } = req.body;

    if (!record_id) {
      return res.status(400).json({ error: "Missing record ID" });
    }

    await deleteData(col, record_id);
    res.status(204).json({ message: "Record deleted successfully", record_id });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}


// Handler to get user-specific records (orders)
export async function handlerUserOrderGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);
    
    const userOrders = await getQueryData(col, "userId", decodedToken.userId);

    if (!userOrders.length) {
      return res.status(404).json({ error: "No orders found for this user" });
    }

    const formattedOrders = userOrders.map(order => ({
      ...order,
      fullname: order.fullname,
      email: order.email,
      delivery_address: order.delivery_address,
      total_amount: order.total_amount,
      contact: order.contact,
      payment_method: order.payment_method,
      items: order.items,
      date: order.date
    }));

    res.status(200).json(response(formattedOrders));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}