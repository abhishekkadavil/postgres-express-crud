import pool from "../config/db.js";

// Insert a new user
export const insertUser = async (email, hashedPassword) => {
  return await pool.query(
    "INSERT INTO auth_user (user_email, user_password) VALUES ($1, $2)",
    [email, hashedPassword]
  );
};

// Find user by email
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM auth_user WHERE user_email = $1",
    [email]
  );
  return result.rows[0];
};
