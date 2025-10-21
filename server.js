import http from "http";
import url from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { users } from "./db.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

function getBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data ? JSON.parse(data) : {}));
  });
}

function send(res, code, msg) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(msg));
}

async function auth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findOne({ _id: new globalThis.ObjectId(decoded.id) });
    delete user.password;
    return user;
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (pathname === "/register" && req.method === "POST") {
    const body = await getBody(req);
    const { name, email, password, role } = body;
    const exist = await users.findOne({ email });
    if (exist) return send(res, 400, { msg: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    await users.insertOne({ name, email, password: hashed, role: role || "user" });
    return send(res, 201, { msg: "Registered successfully" });
  }

  if (pathname === "/login" && req.method === "POST") {
    const body = await getBody(req);
    const user = await users.findOne({ email: body.email });
    if (!user) return send(res, 400, { msg: "Invalid email" });
    const ok = await bcrypt.compare(body.password, user.password);
    if (!ok) return send(res, 400, { msg: "Wrong password" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return send(res, 200, { msg: "Login success", token });
  }

  if (pathname === "/profile" && req.method === "GET") {
    const user = await auth(req);
    if (!user) return send(res, 401, { msg: "Unauthorized" });
    return send(res, 200, { profile: user });
  }

  if (pathname === "/users" && req.method === "GET") {
    const user = await auth(req);
    if (!user || user.role !== "admin") return send(res, 403, { msg: "Access Denied" });
    const all = await users.find({}, { projection: { password: 0 } }).toArray();
    return send(res, 200, { users: all });
  }

  send(res, 404, { msg: "Route not found" });
});

server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
