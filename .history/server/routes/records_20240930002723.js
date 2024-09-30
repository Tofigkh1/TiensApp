import { getAllData } from "../helper/getAllData";
import { response } from "../utils/response";
import { verifyJWT } from "../utils/jwt";
import { addData } from "../helper/addData";
import { uptData } from "../helper/uptData";
import { getDataID } from "../helper/getDataID";
import { ROUTER } from "../constant/router";
import { emptyBasket } from "../constant/basket";
import { deleteData } from "../helper/deleteData";
import { getQueryData } from "../helper/getQueryData";
import { Record } from "../models/Recrods";

// Handler to get all records
export async function handlerRecordsGET(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const records = await getAllData(col);

    const formattedRecords = records.map(record => {
      const recordInstance = new Record(
        record.userId, 
        record.fullname, 
        record.email, 
        record.delivery_address, 
        record.total_amount, 
        record.contact, 
        record.payment_method, 
        record.items, 
        record.date, 
        record.createdAt
      );
      return recordInstance.toPlainObject();
    });

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

    const record = new Record(
      decodedToken.userId,
      fullname,
      email,
      delivery_address,
      userBasket.total_amount,
      contact,
      payment_method,
      userBasket.items
    );

    // Validate record data
    Record.validate(record);

    const data = await addData(col, record.toPlainObject());

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

    const updatedRecord = new Record(
      null,  // User ID should remain unchanged, so we skip updating it here
      fullname,
      email,
      delivery_address,
      userBasket.total_amount,
      contact,
      payment_method,
      userBasket.items
    );

    // Validate updated record data
    Record.validate(updatedRecord);

    await uptData(col, record_id, updatedRecord.toPlainObject());

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

    const formattedOrders = userOrders.map(order => {
      const orderInstance = new Record(
        order.userId,
        order.fullname,
        order.email,
        order.delivery_address,
        order.total_amount,
        order.contact,
        order.payment_method,
        order.items,
        order.date,
        order.createdAt
      );
      return orderInstance.toPlainObject();
    });

    res.status(200).json(response(formattedOrders));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
