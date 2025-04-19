import fs from "fs";

const path = "./swagger-output.json";
const swagger = JSON.parse(fs.readFileSync(path, "utf-8"));

// Remove auth from specific routes
["/api/auth/register", "/api/auth/login"].forEach((route) => {
  if (swagger.paths[route] && swagger.paths[route].post) {
    swagger.paths[route].post.security = [];
  }
});

fs.writeFileSync(path, JSON.stringify(swagger, null, 2));
console.log("✅ Swagger file patched.");
