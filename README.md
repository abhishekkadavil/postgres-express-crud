This is a simple CRUD API with node and express

```
npm i express dotenv pg cors joi
```

joi - schema validation  
express - node framework  
dotenv - env value handling  
pg - Postgres  
cors - CORS operation

middleware is a function that executes during the lifecycle of a request to the server, typically between when the request is received and the response is sent.

eg:  
// Parses incoming JSON payloads and puts it on req.body.  
app.use(express.json());

// Enables CORS (Cross-Origin Resource Sharing).  
app.use(cors());

// Error handling middleware  
app.use(errorHandling);

swagger

```
npm install --save-dev swagger-ui-express
npm install --save-dev swagger-autogen
```

// to run server  
npm run dev  
// to generate swagger json  
npm run swagger

// to generate swagger and run server  
npm run swagger && npm run dev  
swagger url - http://localhost:5001/api-docs/#/

Flow  
index.js -> <- route -> <- validator(middleware) -> <- controller(middleware) -> <- model

// Docker  
To build docker image locally:

```
docker build -t abhishekkadavil/postgres-express-crud:v1 .
run local docker image locally -
docker run -p 5001:5001 \
 --network=postgres-express-crud_my_network \
 -e PORT=5001 \
 -e DB_HOST=postgres-container \
 -e DB_PORT=5432 \
 -e DB_USER=postgres \
 -e DB_PASSWORD=postgres \
 -e DB_NAME=postgres \
 abhishekkadavil/postgres-express-crud:v1
```

push to docker hub:

```
docker push abhishekkadavil/postgres-express-crud:v1
```

To use docker:

```
docker-compose up
docker-compose down
```
