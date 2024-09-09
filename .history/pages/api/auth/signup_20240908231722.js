import admin from "../../../server/configs/firebaseAdmin";
import { ROUTER } from "../../../server/constant/router";
import { addData } from "../../../server/helper/addData";
import { enableCors } from "../../../server/utils/enableCors";
import { passwordHash } from "../../../server/utils/passwordHash";
import admin from "../../../server/configs/firebaseAdmin";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, username, fullname, phoneNumber, idToken } = req.body ?? {};
    try {
      // OTP doğrulaması ile gelen token'ı doğrula
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      if (!decodedToken.phone_number || decodedToken.phone_number !== phoneNumber) {
        return res.status(400).json({ error: "Telefon numarası doğrulanamadı." });
      }

      // Şifreyi hashle ve kullanıcıyı oluştur
      const hashPassword = await passwordHash(password);

      const userInfo = {
        email,
        password: hashPassword,
        phoneNumber,
      };

      const customClaims = {
        username,
        fullname,
      };

      const userRecord = await admin.auth().createUser(userInfo);
      await admin.auth().setCustomUserClaims(userRecord.uid, customClaims);

      res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu", user: userRecord });
    } catch (error) {
      console.error("Kullanıcı oluşturma hatası:", error);
      res.status(500).json({ error: "Kullanıcı oluşturulamadı." });
    }
  }
}

export default handler;
