import express from "express";
import userRouter from "./router/role.routes.js";
import authRoutes from "./router/auth.routes.js";
import { errorHandler } from "./middleware/errorhandler.js";

const app = express();

app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/auth", authRoutes);

const PORT = 3030;

// app.get("/health", (_req: Request, res: Response) => {
//   res.status(200).json({ status: "ok", time: new Date().toISOString() });
// });

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${new Date()} running on port ${PORT}`);
});
