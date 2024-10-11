import { ROUTER } from "../constant/router";
import { addData } from "../helper/addData";
import { deleteData } from "../helper/deleteData";
import { getAllData } from "../helper/getAllData";
import { getDataID } from "../helper/getDataID";
import { getQueryData } from "../helper/getQueryData";
import { verifyJWT } from "../utils/jwt";
import { response } from "../utils/response";

// Handler to get all records (GET)
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
      date: record.date
    }));

    res.status(200).json(response(formattedRecords));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to add a new record (POST)
export async function handlerAddRecordPOST(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = verifyJWT(idToken);

    // Yalnızca record_id body'den alınıyor
    const { record_id } = req.body;

    // record_id kullanarak kaydı al
    const record = await getDataID(ROUTER.RECORDS, record_id);

    if (!record) {
      return res.status(404).json({ error: "Record not found!" });
    }

    // Yeni kayıt veritabanına ekleniyor
    const data = await addData(col, record);

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// Handler to delete a record (DELETE)
export async function handlerDeleteRecord(req, res, col) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { record_id } = req.body;

    const record = await getDataID(ROUTER.RECORDS, record_id);

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    await addData(ROUTER.RECORDS_HISTORY, record);

    await deleteData(col, record_id);
    res.status(204).json({ message: "Record deleted successfully", record_id });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
