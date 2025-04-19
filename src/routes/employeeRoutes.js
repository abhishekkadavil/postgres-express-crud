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

/**
 * @route   POST /api/employee
 * @desc    Create a new employee
 * @access  Private
 * @security bearerAuth
 */
router.post("/employee", protect, validateCreateEmployee, createEmployee);

/**
 * @route   GET /api/employees
 * @desc    Get all employees
 * @access  Private
 * @security bearerAuth
 */
router.get("/employees", protect, getAllEmployees);

/**
 * @route   GET /api/employee/:id
 * @desc    Get employee by ID
 * @access  Private
 * @security bearerAuth
 */
router.get("/employee/:id", protect, getEmployeeById);

/**
 * @route   PUT /api/employee/:id
 * @desc    Update employee details
 * @access  Private
 * @security bearerAuth
 */
router.put("/employee/:id", protect, validateUpdateEmployee, updateEmployee);

/**
 * @route   DELETE /api/employee/:id
 * @desc    Delete employee
 * @access  Private
 * @security bearerAuth
 */
router.delete("/employee/:id", protect, deleteEmployee);

export default router;
