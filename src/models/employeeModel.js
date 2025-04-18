import pool from "../config/db.js";

export const getAllEmployeesService = async () => {
  const result = await pool.query("SELECT * FROM employees");
  return result.rows;
};
export const getEmployeeByIdService = async (id) => {
  const result = await pool.query(
    "SELECT * FROM employees where employee_id = $1",
    [id]
  );
  return result.rows[0];
};
export const createEmployeeService = async (
  employee_id,
  employee_name,
  employee_age,
  employee_salary,
  employee_designation
) => {
  const result = await pool.query(
    "INSERT INTO employees (employee_id, employee_name, employee_age, employee_salary, employee_designation) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      employee_id,
      employee_name,
      employee_age,
      employee_salary,
      employee_designation,
    ]
  );
  return result.rows[0];
};
export const updateEmployeeService = async (
  id,
  employee_age,
  employee_salary,
  employee_designation
) => {
  const result = await pool.query(
    "UPDATE employees SET employee_age=$1, employee_salary=$2, employee_designation=$3 WHERE employee_id=$4 RETURNING *",
    [employee_age, employee_salary, employee_designation, id]
  );
  return result.rows[0];
};
export const deleteEmployeeService = async (id) => {
  const result = await pool.query(
    "DELETE FROM employees WHERE employee_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
