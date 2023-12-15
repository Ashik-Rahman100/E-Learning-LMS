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

// Get all orders only for --admin
export const getAllOrdersService = async (res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    orders,
  });
};
