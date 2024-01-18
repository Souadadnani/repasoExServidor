import express from "express";
import userRouter from "./usuarios/infrastructure/rest/user.router";
import createMongoConnection from "./context/mongo.connector";
createMongoConnection();

const app = express();
const port = 8080;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(`/users`, userRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});