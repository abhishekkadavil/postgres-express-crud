import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { insertUser, findUserByEmail } from "../models/authModel.js";

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const hashedPassword = await bcrypt.hash(userPassword, 10);

  try {
    await insertUser(userEmail, hashedPassword);
    handleResponse(res, 201, "User registered successfully");
  } catch (err) {
    if (err.code === "23505") {
      return handleResponse(res, 400, "User already exists");
    }
    throw err; // Pass other errors to global error handler
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const user = await findUserByEmail(userEmail);

  if (!user) {
    return handleResponse(res, 401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(userPassword, user.user_password);
  if (!isMatch) {
    return handleResponse(res, 401, "Invalid credentials");
  }

  const token = jwt.sign({ userEmail: user.user_email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  handleResponse(res, 200, "Login successful", { token });
});
