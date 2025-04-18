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

export const createEmployee = async (req, res, next) => {
  const {
    employeeId,
    employeeName,
    employeeAge,
    employeeSalary,
    employeeDesignation,
  } = req.body;
  try {
    const newEmployee = await createEmployeeService(
      employeeId,
      employeeName,
      employeeAge,
      employeeSalary,
      employeeDesignation
    );
    handleResponse(res, 201, "Employee created successfully", newEmployee);
  } catch (err) {
    next(err);
  }
};

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await getAllEmployeesService();
    handleResponse(res, 200, "Employees fetched successfully", employees);
  } catch (err) {
    next(err);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await getEmployeeByIdService(req.params.id);
    if (!employee) return handleResponse(res, 404, "Employee not found");
    handleResponse(res, 200, "Employee fetched successfully", employee);
  } catch (err) {
    next(err);
  }
};

export const updateEmployee = async (req, res, next) => {
  const { employeeAge, employeeSalary, employeeDesignation } = req.body;
  try {
    const updatedEmployee = await updateEmployeeService(
      req.params.id,
      employeeAge,
      employeeSalary,
      employeeDesignation
    );
    if (!updatedEmployee) return handleResponse(res, 404, "Employee not found");
    handleResponse(res, 200, "Employee updated successfully", updatedEmployee);
  } catch (err) {
    next(err);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const deletedEmployee = await deleteEmployeeService(req.params.id);
    if (!deletedEmployee) return handleResponse(res, 404, "Employee not found");
    handleResponse(res, 200, "Employee deleted successfully", deleteEmployee);
  } catch (err) {
    next(err);
  }
};
