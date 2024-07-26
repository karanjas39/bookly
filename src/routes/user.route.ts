import { Hono } from "hono";
import {
  authMiddleware,
  isverifiedMiddleware,
} from "../middlewares/auth.middleware";
import { UserDetail, UpdatePassword } from "../controllers/user.controllers";
import { UserAllFeedbacks } from "../controllers/feedback.controllers";

const User = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
    admin: boolean;
  };
}>();

// USER
User.get("/detail", authMiddleware, UserDetail);
User.put("/password/update", authMiddleware, UpdatePassword);

// FEEDBACK
User.get(
  "/feedback/all",
  authMiddleware,
  isverifiedMiddleware,
  UserAllFeedbacks
);

export default User;
