import express from "express";
import cors from "cors";
import roleRouter from "./router/role.routes.js";
import authRouter from "./router/auth.routes.js";
import taskRouter from "./router/task.routes.js";
import logRouter from "./router/log.routes.js";
import "dotenv/config";
const env = process.env;

import { errorHandler } from "./middleware/errorhandler.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", roleRouter, taskRouter, logRouter);
app.use("/auth", authRouter);

const PORT = env.PORT || 3000;

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${new Date()} running on port ${PORT}`);
});
