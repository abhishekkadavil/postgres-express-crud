# This is a simple CRUD API with node and express

### dependency

```
npm i express dotenv pg cors joi
```

- joi - Input validation
- express - node framework
- dotenv - env value handling
- pg - Postgres
- cors - CORS operation
- `npm i express-async-handler` - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers. [https://github.com/abhishekkadavil/postgres-express-crud/pull/2]
- npm install --save-dev jest supertest - UT
- npm i jsonwebtoken - auth feature
- npm i bcrypt - encrypt password

### Swagger

```
npm install --save-dev swagger-ui-express
npm install --save-dev swagger-autogen
```

// to generate swagger and run server  
npm run swagger && npm run dev  
swagger url - http://localhost:5001/api-docs/#/

### Execution

// to run server  
npm run dev  
// to generate swagger json  
npm run swagger

### Test

npm run test

### Flow - Employee

index.js -> <- route -> <- validator(middleware) -> <- controller(middleware) -> <- model

Program will be start from [index.js](index.js). `const app = express();` wil create express application instance and set the port using `const port = process.env.PORT || 3001;`.

Then using the middleware `app.use(express.json());` the express will automatically parse incoming JSON request bodies and using `app.use(cors());` enables CORS(why its needed - Browsers block requests from different origins by default for security reasons.
So if your frontend is at http://localhost:3000 and your backend is at http://localhost:3001, without cors() your frontend would get a CORS error).

After that the program will navigate to [Routes](src/routes/employeeRoutes.js) the routes are handled here. Apart from routes we also handle input validation are here as well. These input validations are handled using Joi npm package and returned error from [inputValidator](src/middlewares/inputValidator.js), later these error will be handled in [errorHandler](src/middlewares/errorHandler.js) middleware.

The toke validation is done using [authMiddleware](src/middlewares/authMiddleware.js).

From routes if the input validation is success, the program will be execute [employeeController](src/controllers/employeeController.js), Here is where we will be handling db related tasks, using [employeeModel](src/models/employeeModel.js) we will be performing db operations. and connection required for db operation will get from [db.js](src/config/db.js). If there is any error it will be returned and will be handled in [errorHandler](src/middlewares/errorHandler.js) middleware.

Since error handler middleware is executed last in the [index.js](index.js) all the error present during the execution will be handled at last.

### Flow - Token

Incase of auth token just like employee, it will be starting from `app.use("/api/auth", authRoutes);` in [index](index.js). After that the program will navigate to [authRoutes](src/routes/authRoutes.js). validation and checks are done in [authController](src/controllers/authController.js). After the validation with the help of [authModel](src/models/authModel.js) it will perform the DB operations.

### Docker

To build docker image locally:

```
docker build -t abhishekkadavil/postgres-express-crud:v1 .
```

Run local docker image locally:

```
docker run -p 5001:5001 \
 --network=postgres-express-crud_my_network \
 -e PORT=5001 \
 -e DB_HOST=postgres-container \
 -e DB_PORT=5432 \
 -e DB_USER=postgres \
 -e DB_PASSWORD=postgres \
 -e DB_NAME=postgres \
 -e JWT_SECRET=123456 \
 -e JWT_EXPIRES_IN=1m \
 abhishekkadavil/postgres-express-crud:v2
```

Push to docker hub:

```
docker push abhishekkadavil/postgres-express-crud:v1
```

To use docker:

```
docker-compose up
docker-compose down
```
