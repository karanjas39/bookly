import { Hono } from "hono";
import {
  authMiddleware,
  isverifiedMiddleware,
} from "../middlewares/auth.middleware";
import { UserDetail, UpdatePassword } from "../controllers/user.controllers";
import {
  DeleteBook,
  GetBook,
  GetBooks,
  SellBook,
  UpdateBook,
} from "../controllers/book.controllers";

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
User.get("/book/:id", GetBook);
User.get("/books", GetBooks);
User.post("/book/sell", authMiddleware, isverifiedMiddleware, SellBook);
User.put("/book/update", authMiddleware, isverifiedMiddleware, UpdateBook);
User.delete("/book/delete", authMiddleware, isverifiedMiddleware, DeleteBook);

export default User;
