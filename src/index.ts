import { Hono } from "hono";
import Auth from "./routes/auth";
const app = new Hono();

app.route("/api/v1/auth", Auth);

export default app;
