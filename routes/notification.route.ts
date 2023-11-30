import express from "express";
import {
  getAllNotification,
  updateNotification,
} from "../controllers/notification.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllNotification
);

notificationRoute.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);
export default notificationRoute;
