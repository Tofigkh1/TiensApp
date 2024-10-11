import { getAllData } from "../helper/getAllData";
import { response } from "../utils/response";
import { verifyJWT } from "../utils/jwt";
import { getAllData } from "../helper/getAllData";
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