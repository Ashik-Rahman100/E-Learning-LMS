import express from "express";
import {
  getCourseAnalytics,
  getOrdersAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);
analyticsRouter.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getCourseAnalytics
);
analyticsRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);

export default analyticsRouter;
