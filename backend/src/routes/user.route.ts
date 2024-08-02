import { Hono } from "hono";
import {
  authMiddleware,
  isverifiedMiddleware,
} from "../middlewares/auth.middleware";
import { UserDetail, UpdatePassword } from "../controllers/user.controllers";
import { UserAllFeedbacks } from "../controllers/feedback.controllers";
import { AllBuyRequest } from "../controllers/bookRequest.controllers";
import { AllGenres } from "../controllers/genre.controllers";
import { GetMyBook, GetMyBooks } from "../controllers/book.controllers";

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

// BOOK
User.get("/book/all/:listed", authMiddleware, isverifiedMiddleware, GetMyBooks);
User.get("/book/single/:id", authMiddleware, isverifiedMiddleware, GetMyBook);

// FEEDBACK
User.get(
  "/feedback/all",
  authMiddleware,
  isverifiedMiddleware,
  UserAllFeedbacks
);

// BUY REQUEST
User.get(
  "/buy-request/all",
  authMiddleware,
  isverifiedMiddleware,
  AllBuyRequest
);

// GENRE
User.get("/genre/all", AllGenres);

export default User;
