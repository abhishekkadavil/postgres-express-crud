import request from "supertest";
import app from "../index.js";
import pool from "../src/config/db.js"; // path to your db.js

describe("Employee API", () => {
  let createdId;

  test("POST /api/employee - create employee", async () => {
    const response = await request(app).post("/api/employee").send({
      employeeName: "John Doe",
      employeeAge: 30,
      employeeSalary: 5000,
      employeeDesignation: "Developer",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toHaveProperty("employee_id");
    createdId = response.body.data.employee_id;
  });

  test("GET /api/employees - get all employees", async () => {
    const response = await request(app).get("/api/employees");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("GET /api/employee/:id - get employee by ID", async () => {
    const response = await request(app).get(`/api/employee/${createdId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty("employee_id", createdId);
  });

  test("PUT /api/employee/:id - update employee", async () => {
    const response = await request(app).put(`/api/employee/${createdId}`).send({
      employeeAge: 32,
      employeeSalary: 6000,
      employeeDesignation: "Senior Developer",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Employee updated successfully");
  });

  test("DELETE /api/employee/:id - delete employee", async () => {
    const response = await request(app).delete(`/api/employee/${createdId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Employee deleted successfully");
  });
});

afterAll(async () => {
  console.log("Closing DB connection...");
  await pool.end();
  console.log("DB pool closed.");
});
