import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsync";
import CourseModel from "../models/course.model";

export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
