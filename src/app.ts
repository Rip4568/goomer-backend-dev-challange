// src/app.ts
import express from "express";
import routes from "./routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get('/', (request, response) => {
  response.send("Hello World!");
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})