import { NextFunction, Request, Response } from "express";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLast12MonthsData } from "../utils/analytics.generator";

// get user analytics only for -- admin
export const getUserAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await generateLast12MonthsData(userModel);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};
// get course analytics only for -- admin
export const getCourseAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await generateLast12MonthsData(CourseModel);

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};
// get orders analytics only for -- admin
export const getOrdersAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await generateLast12MonthsData(OrderModel);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};
