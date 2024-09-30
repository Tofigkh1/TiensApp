import { emptyBasket } from "../constant/basket";
import { ROUTER } from "../constant/router";
import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { uptData } from "../helper/uptData";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";

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

    // Extract the fields from the request body
    const { fullname, email, delivery_address, payment_method, contact, basket_id } = req.body;

    const userBasket = await getDataID(ROUTER.CARD, basket_id);

    if (!userBasket.items.length) {
      return res.status(404).json({ error: "Basket is empty!" });
    }

    // Create a record with the required fields
    const record = {
      userId: decodedToken.userId,
      fullname,
      email,
      delivery_address,
      total_amount: userBasket.total_amount,
      contact,
      payment_method,
      items: userBasket.items,
      date: new Date(),  // current date
      createdAt: new Date()  // date to track for deletion
    };

    const data = await addData(col, record);

    // Empty the user’s basket after the record is added
    await uptData(ROUTER.CARD, basket_id, emptyBasket(decodedToken.userId));

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
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
      date: new Date()  // update with current date
    };

    await uptData(col, record_id, updatedRecord);

    res.status(200).json({ message: "Record updated successfully", record_id });
  } catch (error) {
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

    await deleteData(col, record_id);
    res.status(204).json({ message: "Record deleted successfully", record_id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Helper function to auto-delete records after 16 days
export async function autoDeleteOldRecords(col) {
  try {
    const records = await getAllData(col);

    const now = new Date();
    const SIXTEEN_DAYS_MS = 16 * 24 * 60 * 60 * 1000;

    // Filter and delete records older than 16 days
    const oldRecords = records.filter(record => {
      const recordDate = new Date(record.createdAt);
      return now - recordDate > SIXTEEN_DAYS_MS;
    });

    for (const record of oldRecords) {
      await deleteData(col, record.id);
    }

    console.log(`${oldRecords.length} old records deleted`);
  } catch (error) {
    console.error("Error in auto-delete:", error);
  }
}
