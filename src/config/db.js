import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();

if (
  !process.env.DB_USER ||
  !process.env.DB_HOST ||
  !process.env.DB_NAME ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_PORT
) {
  console.error("Missing required database environment variables");
  process.exit(1);
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  max: 20, // max number of connections in pool
  idleTimeoutMillis: 30000, // close idle clients after 30s
  connectionTimeoutMillis: 2000, // return error after 2s if connection could not be established
});

pool.on("connect", () => {
  console.log("Connection pool established with Database");
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(1); // or handle gracefully in production
});

// Only close the pool on exit in non-test environments
if (process.env.NODE_ENV !== "test") {
  process.on("SIGINT", async () => {
    console.log("Gracefully shutting down DB...");
    await pool.end();
    process.exit(0);
  });

  process.on("exit", async () => {
    console.log("Exiting process, cleaning up DB...");
    await pool.end();
  });
}

export default pool;
