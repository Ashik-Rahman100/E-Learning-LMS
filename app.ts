import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { ErrorMiddleware } from "./middleware/error";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import userRouter from "./routes/user.route";

export const app = express();
require("dotenv").config();

// Body Parser
app.use(express.json({ limit: "50mb" }));
// cookie-parser
app.use(cookieParser());
// cors Policy
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
// Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", orderRouter);

// Test Api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  // console.log(`Server is Running`);
  res.status(200).json({
    success: true,
    message: "Api is Working",
  });
});

// Unknown Route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 400;
  next(err);
});

// add error handler middleware
app.use(ErrorMiddleware);
