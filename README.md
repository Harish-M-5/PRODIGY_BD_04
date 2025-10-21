# PRODIGY_BD_04
JWT-Based Authentication and Authorization 

# 🔐 JWT-Based Authentication & Authorization using Node.js and MongoDB

This project implements **secure user authentication and role-based authorization** using **JSON Web Tokens (JWT)** in Node.js and MongoDB.  
It allows users to register, log in, and access protected routes with different permissions based on their roles (user/admin/owner).

---

## 🧩 **Overview**

This task 4 project demonstrates how authentication and authorization systems work in backend applications.  
It covers all the major parts of secure backend development intern:

- User registration with hashed passwords (using bcrypt)
- JWT-based login and token generation
- Protected routes that require valid tokens
- Role-based access control (admin, user, owner)
- MongoDB integration for user data storage

---

## 🚀 **Features**

✅ User Registration and Login  
✅ Password Hashing with bcrypt  
✅ JWT Token Generation on Login  
✅ Token Verification Middleware  
✅ Protected Routes (accessible only to authenticated users)  
✅ Role-Based Access Control (admin, user, owner)  
✅ Built with Node.js

✅ MongoDB Database Integration  

---

## 🧠 **Technology Used**

| Stack | Purpose |
|-------|----------|
| **Node.js** | Backend runtime |
| **MongoDB** | Database to store user info |
| **bcryptjs** | Hash user passwords |
| **jsonwebtoken** | Generate and verify JWT tokens |
| **dotenv** | Load environment variables |
| **HTTP core module** | Handle requests |

---

## ⚙️ **Installation and Setup**


1 Install dependencies
npm install

2 Setup environment variables
Create a file named .env in the root folder:

MONGO_URI=mongodb://localhost:27017
DB_NAME=jwt_simple
JWT_SECRET=mysecret
PORT=4000
cd jwt-auth-node


3 Start MongoDB server
mongod


4 Run the project
npm start

## 🔐 **Authentication & Authorization Testing**

 Test the API endpoints using Postman 

🧍 1️⃣ Register User

POST http://localhost:4000/register
Body (JSON):

{
  "name": "Harish",
  "email": "harish@example.com",
  "password": "12345",
  "role": "admin"
}


Response:

{
  "msg": "Registered successfully"
}

🔑 2️⃣ Login User

POST http://localhost:4000/login
Body (JSON):

{
  "email": "harish@example.com",
  "password": "12345"
}


Response:

{
  "msg": "Login success",
  "token": "<your-jwt-token>"
}

👤 3️⃣ Access Protected Route (Profile)

GET http://localhost:4000/profile
Header:

Authorization: Bearer <your-jwt-token>


Response:

{
  "profile": {
    "name": "Harish",
    "email": "harish@example.com",
    "role": "admin"
  }
}

🧑‍💼 4️⃣ Admin Route – Get All Users

GET http://localhost:4000/users
Header:

Authorization: Bearer <admin-token>


Response:

{
  "users": [
    {
      "name": "Harish",
      "email": "harish@example.com",
      "role": "admin"
    }
  ]
}


If a non-admin tries to access this route:

{
  "msg": "Access Denied"
}

## 📜 **License**

This project is licensed under the MIT License — you can freely use, modify, and distribute it.

MIT License

Copyright (c) 2025 Harish

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
