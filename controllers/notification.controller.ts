import { NextFunction, Request, Response } from "express";
import cron from "node-cron";
import { CatchAsyncError } from "../middleware/catchAsync";
import NotificationModel from "../models/notification.model";
import ErrorHandler from "../utils/ErrorHandler";
// Get All Notification only -- admin
export const getAllNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notification,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// Update Notification status only -- admin
export const updateNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);

      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }

      await notification.save();

      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete notification only --admin
cron.schedule("0 0 0 * * *", () => {
  // console.log('running a task every minute');
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  NotificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Delete read notification");
});
