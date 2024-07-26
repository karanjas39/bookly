import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function authMiddleware(c: Context, next: Next) {
  try {
    const jwt = c.req.header("Authorization");

    if (!jwt) {
      return c.json({
        success: false,
        status: 400,
        message: "User is unauthorized.",
      });
    }

    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload) {
      return c.json({
        success: false,
        status: 400,
        message: "User is unauthorized.",
      });
    }
    c.set("userId", payload.userId);
    c.set("admin", payload.admin);
    await next();
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: "[Error] while verifying the token.",
    });
  }
}

export async function isverifiedMiddleware(c: Context, next: Next) {
  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json({
        success: false,
        status: 400,
        message: "User is unauthorized.",
      });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isUserVerified = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (isUserVerified && !isUserVerified.verified) {
      return c.json({
        success: false,
        status: 400,
        message: "User is unauthorized.",
      });
    }

    await next();
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: "[Error] while verifying user.",
    });
  }
}
