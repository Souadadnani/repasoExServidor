import express from "express";
import userRouter from "./usuarios/infrastructure/rest/user.router";
import usersWeb from "./usuarios/infrastructure/web/users.web";
import librosRouter from "./Libros/infrastructure/rest/libro.router";
import librosWeb from "./Libros/infrastructure/web/libro.web";
import createMongoConnection from "./context/mongo.connector";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json";

createMongoConnection();
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views/');
app.use(express.static(__dirname + '/public'));

app.use('/users', userRouter);
app.use('/user', usersWeb);
app.use('/api/libros', librosRouter);
app.use('/libros', librosWeb);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {explorer: true})
)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});