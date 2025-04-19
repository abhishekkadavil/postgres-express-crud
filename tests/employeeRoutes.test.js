import request from "supertest";
import app from "../index.js";
import pool from "../src/config/db.js";

const testUser = {
  userEmail: "employee_test@example.com",
  userPassword: "Test@123",
};

let authToken;
let createdId;

describe("Protected Employee API", () => {
  beforeAll(async () => {
    // Clean up any old test user
    await pool.query("DELETE FROM auth_user WHERE user_email = $1", [
      testUser.userEmail,
    ]);

    // Register new user
    await request(app).post("/api/auth/register").send(testUser);

    // Log in and get token
    const res = await request(app).post("/api/auth/login").send(testUser);
    authToken = res.body.data.token;
  });

  afterAll(async () => {
    // Clean up user and employee if necessary
    await pool.query("DELETE FROM auth_user WHERE user_email = $1", [
      testUser.userEmail,
    ]);
    await pool.end();
  });

  test("POST /api/employee - create employee", async () => {
    const response = await request(app)
      .post("/api/employee")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
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
    const response = await request(app)
      .get("/api/employees")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("GET /api/employee/:id - get employee by ID", async () => {
    const response = await request(app)
      .get(`/api/employee/${createdId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty("employee_id", createdId);
  });

  test("PUT /api/employee/:id - update employee", async () => {
    const response = await request(app)
      .put(`/api/employee/${createdId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        employeeAge: 32,
        employeeSalary: 6000,
        employeeDesignation: "Senior Developer",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Employee updated successfully");
  });

  test("DELETE /api/employee/:id - delete employee", async () => {
    const response = await request(app)
      .delete(`/api/employee/${createdId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Employee deleted successfully");
  });

  test("GET /api/employees - should fail without token", async () => {
    const response = await request(app).get("/api/employees");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
