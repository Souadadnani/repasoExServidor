import express from "express";


const app = express();
const port = 8080;

app.use(express.json());
const api = "/api";
//app.use(`${api}/users`, userRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});