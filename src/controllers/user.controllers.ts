import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "zod";
import { z_updatePassword } from "../utils/zod.types";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export async function UserDetail(c: Context) {
  try {
    const userId = c.get("userId");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        createdAt: true,
        verified: true,
      },
    });

    if (!user) throw new Error();

    return c.json({
      success: true,
      status: 200,
      user,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: "[Error] in finding this user.",
    });
  }
}

export async function UpdatePassword(c: Context) {
  try {
    const userId: string = c.get("userId");
    const body: z.infer<typeof z_updatePassword> = await c.req.json();

    const { success } = z_updatePassword.safeParse(body);

    if (!success) {
      return c.json({
        success: false,
        status: 404,
        message: "Invalid inputs are passed.",
      });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isUser) throw new Error();

    const isPassword = compareSync(body.prevPassword, isUser.password);

    if (!isPassword) throw new Error();

    const salt = genSaltSync(c.env.SALT);
    const newPassword = hashSync(body.currPassword, salt);

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });

    return c.json({
      success: true,
      status: 200,
      updatedUser,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: "[Error] in updating this user.",
    });
  }
}
