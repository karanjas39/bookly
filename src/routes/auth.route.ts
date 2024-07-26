import { Hono } from "hono";
import { Signin, Signup } from "../controllers/auth.controllers";

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    SALT: number;
  };
  Variables: {
    userId: string;
    admin: boolean;
  };
}>();

auth.post("/signup", Signup);
auth.post("/signin", Signin);

export default auth;
