import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employeeController.js";
import {
  validateCreateEmployee,
  validateUpdateEmployee,
} from "../middlewares/inputValidator.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/employee", protect, validateCreateEmployee, createEmployee);
router.get("/employees", protect, getAllEmployees);
router.get("/employee/:id", protect, getEmployeeById);
router.put("/employee/:id", protect, validateUpdateEmployee, updateEmployee);
router.delete("/employee/:id", protect, deleteEmployee);

export default router;
