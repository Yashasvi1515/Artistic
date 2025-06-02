import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Authorization header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token:", token);

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const secretKey = process.env.JWT_SECRET || "your_secret_key";
    console.log("Secret Key:", secretKey);

    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT error:", err.message);
    res.status(403).json({ message: "Invalid token" });
  }
}
