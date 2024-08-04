import { Hono } from "hono";
import {
  authMiddleware,
  isverifiedMiddleware,
} from "../middlewares/auth.middleware";
import { UserDetail, UpdatePassword } from "../controllers/user.controllers";
import {
  UserAllFeedbacks,
  UserBookAllFeedbacks,
} from "../controllers/feedback.controllers";
import {
  AllAcceptedBuyRequest,
  AllBuyRequest,
} from "../controllers/bookRequest.controllers";
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

User.get(
  "/feedback/book/all",
  authMiddleware,
  isverifiedMiddleware,
  UserBookAllFeedbacks
);

// BUY REQUEST
User.get(
  "/buy-request/all",
  authMiddleware,
  isverifiedMiddleware,
  AllBuyRequest
);

User.get(
  "/buy-request/accepted/all",
  authMiddleware,
  isverifiedMiddleware,
  AllAcceptedBuyRequest
);

// GENRE
User.get("/genre/all", AllGenres);

export default User;
