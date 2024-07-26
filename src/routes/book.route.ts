import { Hono } from "hono";
import {
  authMiddleware,
  isverifiedMiddleware,
} from "../middlewares/auth.middleware";
import {
  DeleteBook,
  GetBook,
  GetBooks,
  SellBook,
  UpdateBook,
} from "../controllers/book.controllers";
import {
  CreateFeedback,
  DeleteFeedback,
} from "../controllers/feedback.controllers";

const Book = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
    admin: boolean;
  };
}>();

// BOOK
Book.get("/single/:id", GetBook);
Book.get("/bulk", GetBooks);
Book.post("/sell", authMiddleware, isverifiedMiddleware, SellBook);
Book.put("/update", authMiddleware, isverifiedMiddleware, UpdateBook);
Book.delete("/delete", authMiddleware, isverifiedMiddleware, DeleteBook);

// FEEDBACK
Book.post(
  "/feedback/create",
  authMiddleware,
  isverifiedMiddleware,
  CreateFeedback
);

Book.delete(
  "/feedback/delete",
  authMiddleware,
  isverifiedMiddleware,
  DeleteFeedback
);

export default Book;
