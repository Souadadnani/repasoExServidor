import express from "express";
import userRouter from "./usuarios/infrastructure/rest/user.router";
import createMongoConnection from "./context/mongo.connector";
createMongoConnection();

const app = express();
const port = 8080;

app.use(express.json());
const api = "/api";
app.use(`/users`, userRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});