import { connectDB, getDB } from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import readline from "readline";

await connectDB();
const db = getDB();
const users = db.collection("users");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(q) {
  return new Promise((resolve) => rl.question(q, resolve));
}

async function register() {
  const username = await ask("Enter username: ");
  const password = await ask("Enter password: ");
  const hash = await bcrypt.hash(password, 10);

  await users.insertOne({ username, password: hash });
  console.log("User registered!");
}

async function login() {
  const username = await ask("Username: ");
  const password = await ask("Password: ");

  const user = await users.findOne({ username });
  if (!user) return console.log("❌ User not found!");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return console.log("❌ Wrong password!");

  const token = jwt.sign({ username }, "secretkey123", { expiresIn: "1h" });
  console.log("Login success! JWT Token:", token);
}

const choice = await ask("1️⃣ Register  2️⃣ Login → ");
if (choice === "1") await register();
else await login();

rl.close();
