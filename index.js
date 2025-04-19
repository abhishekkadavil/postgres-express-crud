import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" with { type: "json" };

import userRoutes from "./src/routes/employeeRoutes.js";
import errorHandling from "./src/middlewares/errorHandler.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandling);

// Swagger
if (process.env.NODE_ENV !== "test") {
  // Swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Only start server if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Export the app for testing
export default app;
