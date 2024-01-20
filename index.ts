import express from "express";
import userRouter from "./usuarios/infrastructure/rest/user.router";
import librosRouter from "./Libros/infrastructure/rest/libro.router"
import createMongoConnection from "./context/mongo.connector";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json";

createMongoConnection();
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/users', userRouter);
app.use('/libros', librosRouter);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {explorer: true})
)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});