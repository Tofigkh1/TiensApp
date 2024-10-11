import admin from "../../../server/configs/firebaseAdmin";
import { verifyJWT } from "../../../server/utils/jwt";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];
  const decodedToken = verifyJWT(idToken);

  if (req.method === "GET") {
    try {
      const userCredentials = await admin.auth().getUser(decodedToken.userId);

      const user = {
        id: userCredentials.uid,
        email: userCredentials.email,
        username: userCredentials.customClaims.username,
        fullname: userCredentials.customClaims.fullname, // fullname custom claim'den geliyor
        phoneNumber: userCredentials.phoneNumber,
        address: userCredentials.customClaims.address,
        creationTime: userCredentials.metadata.creationTime,
      };

      return res.status(200).json({ message: "Authenticated!", user });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "Could not sign in" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { email, username, fullname, phoneNumber, address } = req.body ?? {};

      if (!email || !username || !fullname || !phoneNumber || !address) {
        return res.status(400).json({ error: "Please fill all fields" });
      }

      const updateUser = {
        email,
        phoneNumber, // Sadece email ve phoneNumber güncelleniyor
      };

      const customClaims = {
        username,
        fullname, // fullname custom claims içinde tutuluyor
        address,
      };

      await admin.auth().updateUser(decodedToken.userId, updateUser);

      // Kullanıcının custom claims bilgilerini günceller
      await admin.auth().setCustomUserClaims(decodedToken.userId, customClaims);

      return res.status(200).json({
        message: "Updated user!",
        user: { id: decodedToken.userId, ...updateUser, ...customClaims },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Could not update user" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
