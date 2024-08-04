import { Context } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_signUp,
  z_singIn,
  z_signUp_type,
  z_singIn_type,
} from "@singhjaskaran/bookly-common";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

export async function Signup(c: Context) {
  const body: z_signUp_type = await c.req.json();

  const { success } = z_signUp.safeParse(body);

  if (!success) {
    return c.json({
      success: false,
      status: 404,
      message: "Invalid inputs are passed.",
    });
  }

  // const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c);
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const salt = genSaltSync(c.env.SALT);
    const hashedPassword = hashSync(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        admin: false,
        verified: true,
      },
    });

    if (!newUser) throw new Error();

    return c.json({
      success: true,
      status: 200,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: "[Error] while creating new user.",
    });
  }
}

export async function Signin(c: Context) {
  const body: z_singIn_type = await c.req.json();

  const { success } = z_singIn.safeParse(body);

  if (!success) {
    return c.json({
      success: false,
      status: 404,
      message: "Invalid inputs are passed.",
    });
  }

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        name: true,
        email: true,
        verified: true,
        createdAt: true,
        id: true,
        admin: true,
        password: true,
      },
    });

    if (!isUserExist)
      return c.json({
        success: false,
        status: 400,
        message: "Password or email is incorrect.",
      });

    const isPasswordCorrect = compareSync(body.password, isUserExist.password);

    if (!isPasswordCorrect)
      return c.json({
        success: false,
        status: 400,
        message: "Password or email is incorrect.",
      });

    const token = await sign(
      { userId: isUserExist.id, admin: isUserExist.admin },
      c.env.JWT_SECRET
    );

    const { id, password, admin, ...user } = isUserExist;

    return c.json({
      success: true,
      status: 200,
      token,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: "[Error] while logging in right now.",
    });
  }
}
