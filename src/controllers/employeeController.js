import asyncHandler from "express-async-handler";

import {
  createEmployeeService,
  deleteEmployeeService,
  getAllEmployeesService,
  getEmployeeByIdService,
  updateEmployeeService,
} from "../models/employeeModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createEmployee = asyncHandler(async (req, res, next) => {
  const { employeeName, employeeAge, employeeSalary, employeeDesignation } =
    req.body;
  const newEmployee = await createEmployeeService(
    employeeName,
    employeeAge,
    employeeSalary,
    employeeDesignation
  );
  handleResponse(res, 201, "Employee created successfully", newEmployee);
});

export const getAllEmployees = asyncHandler(async (req, res, next) => {
  const employees = await getAllEmployeesService();
  handleResponse(res, 200, "Employees fetched successfully", employees);
});

export const getEmployeeById = asyncHandler(async (req, res, next) => {
  const employee = await getEmployeeByIdService(req.params.id);
  if (!employee) return handleResponse(res, 404, "Employee not found");
  handleResponse(res, 200, "Employee fetched successfully", employee);
});

export const updateEmployee = asyncHandler(async (req, res, next) => {
  const { employeeAge, employeeSalary, employeeDesignation } = req.body;
  const updatedEmployee = await updateEmployeeService(
    req.params.id,
    employeeAge,
    employeeSalary,
    employeeDesignation
  );
  if (!updatedEmployee) return handleResponse(res, 404, "Employee not found");
  handleResponse(res, 200, "Employee updated successfully", updatedEmployee);
});

export const deleteEmployee = asyncHandler(async (req, res, next) => {
  const deletedEmployee = await deleteEmployeeService(req.params.id);
  if (!deletedEmployee) return handleResponse(res, 404, "Employee not found");
  handleResponse(res, 200, "Employee deleted successfully", deleteEmployee);
});
