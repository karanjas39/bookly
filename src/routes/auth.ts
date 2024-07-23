import { Hono } from "hono";
import { env } from "hono/adapter";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const auth = new Hono();

type signUpType = {
  email: string;
  name: string;
};

auth.post("/signup", async (ctx) => {
  const body: signUpType = await ctx.req.parseBody();

  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(ctx);
  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  const response = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
    },
  });

  return ctx.json({
    response,
  });
});

export default auth;
