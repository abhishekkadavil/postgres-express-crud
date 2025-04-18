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

const router = express.Router();

router.post("/employee", validateCreateEmployee, createEmployee);
router.get("/employees", getAllEmployees);
router.get("/employee/:id", getEmployeeById);
router.put("/employee/:id", validateUpdateEmployee, updateEmployee);
router.delete("/employee/:id", deleteEmployee);

export default router;
