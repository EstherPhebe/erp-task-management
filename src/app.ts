import express from "express";
import cors from "cors";
import roleRouter from "./router/role.routes.js";
import authRouter from "./router/auth.routes.js";
import taskRouter from "./router/task.routes.js";
import logRouter from "./router/log.routes.js";

import { errorHandler } from "./middleware/errorhandler.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", roleRouter, taskRouter, logRouter);
app.use("/auth", authRouter);

const PORT = 3030;

// app.get("/health", (_req: Request, res: Response) => {
//   res.status(200).json({ status: "ok", time: new Date().toISOString() });
// });

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${new Date()} running on port ${PORT}`);
});
