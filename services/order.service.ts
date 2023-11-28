import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsync";
import OrderModel from "../models/order.model";

export const newOrder = CatchAsyncError(async (data: any, res: Response) => {
  const order = await OrderModel.create(data);
  res.status(201).json({
    success: true,
    order,
  });
});
