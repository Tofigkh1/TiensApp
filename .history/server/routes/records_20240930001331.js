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
