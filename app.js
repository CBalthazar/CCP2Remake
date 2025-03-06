import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => res.status(404).send("page not found"));

app.listen(PORT, () => {
  console.log("server up : http://localhost:" + PORT);
});
