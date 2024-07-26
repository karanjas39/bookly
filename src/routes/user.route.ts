import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserDetail, UpdatePassword } from "../controllers/user.controllers";
import { SellBook, UpdateBook } from "../controllers/book.controllers";

const User = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
    admin: boolean;
  };
}>();

User.use("/*", authMiddleware);

// USER
User.get("/detail", UserDetail);
User.put("/password/update", UpdatePassword);

// BOOK
User.post("/book/sell", SellBook);
User.put("/book/update", UpdateBook);

export default User;
