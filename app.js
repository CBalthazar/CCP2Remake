import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./seed.js";
import userRouter from "./routes/user.routes.js";
import missionRouter from "./routes/mission.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/mission", missionRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Unexpected Server Error";
  res.status(status).json({ message: message });
});

app.use((req, res, next) => res.status(404).send("page not found"));

app.listen(PORT, () => {
  console.log("server up : http://localhost:" + PORT);
});
