import express from "express";
import type { Request, Response } from "express";
import userRouter from "./router/user.js";
const app = express();

app.use("/api/v1", userRouter);

const PORT = 3030;

app.get("/health", (req: Request, res: Response) => {
	res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

app.listen(PORT, () => {
	console.log(`${new Date()} running on port ${PORT}`);
});
