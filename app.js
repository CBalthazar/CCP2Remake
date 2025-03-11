import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import "./seed.js";
import cors from "cors";
import helmet from "helmet";
import filterRes from "./middlewares/";
import userRouter from "./routes/user.routes.js";
import missionRouter from "./routes/mission.routes.js";
import candidatureRouter from "./routes/candidature.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(cookieParser());

app.use(filterRes());

app.use("/user", userRouter);
app.use("/mission", missionRouter);
app.use("/candidature", candidatureRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Unexpected Server Error";
  res.status(status).json({ message: message });
});

app.use((req, res, next) => res.status(404).send("page not found"));

app.listen(PORT, () => {
  console.log("server up : http://localhost:" + PORT);
});
