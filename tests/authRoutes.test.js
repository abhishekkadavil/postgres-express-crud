import request from "supertest";
import app from "../index.js";
import pool from "../src/config/db.js";

const testUser = {
  userEmail: "testuser@example.com",
  userPassword: "password123",
};

let authToken;

describe("Auth API", () => {
  afterAll(async () => {
    // Clean up test user
    await pool.query("DELETE FROM auth_user WHERE user_email = $1", [
      testUser.userEmail,
    ]);
    await pool.end();
  });

  test("POST /api/auth/register - should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  test("POST /api/auth/register - should fail for duplicate user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });

  test("POST /api/auth/login - should login and return token", async () => {
    const response = await request(app).post("/api/auth/login").send(testUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty("token");
    authToken = response.body.data.token;
  });

  test("POST /api/auth/login - should fail for wrong password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      userEmail: testUser.userEmail,
      userPassword: "wrongpassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  test("GET /api/employees - should fetch employees with valid token", async () => {
    const response = await request(app)
      .get("/api/employees")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("GET /api/employees - should fail with no token", async () => {
    const response = await request(app).get("/api/employees");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
