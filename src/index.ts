import { Hono } from "hono";
import Auth from "./routes/auth.route";
import User from "./routes/user.route";
import Book from "./routes/book.route";

const app = new Hono();

app.route("/api/v1/auth", Auth);
app.route("/api/v1/user", User);
app.route("/api/v1/book", Book);
app.all((c) => {
  return c.json({
    success: true,
    status: 200,
    message: "Hello from bookly :)",
  });
});

export default app;
