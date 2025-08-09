import express from "express";
import type { Request, Response } from "express";
import userRouter from "./router/user.js";
import authRoutes from "./router/auth.routes.js";
const app = express();

app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/auth", authRoutes);

const PORT = 3030;

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`${new Date()} running on port ${PORT}`);
});
