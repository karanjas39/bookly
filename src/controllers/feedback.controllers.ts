import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z_createFeedback, z_id } from "../utils/zod.types";
import { z } from "zod";

export async function CreateFeedback(c: Context) {
  const givenBy: string = c.get("userId");
  const body: z.infer<typeof z_createFeedback> = await c.req.json();

  const { success, data } = z_createFeedback.strip().safeParse(body);

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

    const book = await prisma.book.findUnique({
      where: { id: data.bookId },
      select: { listed: true },
    });

    if (!book || !book.listed) throw new Error();

    const newFeedback = await prisma.feedback.create({
      data: {
        feedback: data.feedback,
        bookId: data.bookId,
        givenBy,
      },
    });

    if (!newFeedback) throw new Error();

    return c.json({
      success: true,
      status: 200,
      newFeedback,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while creating this feedback.",
    });
  }
}

export async function DeleteFeedback(c: Context) {
  const givenBy: string = c.get("userId");
  const params = await c.req.json();

  const { success, data } = z_id.strip().safeParse(params);

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

    const deletedFeedback = await prisma.feedback.delete({
      where: {
        id: data.id,
        givenBy,
      },
    });

    if (!deletedFeedback) throw new Error();

    return c.json({
      success: true,
      status: 200,
      deletedFeedback,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while deleting this feedback.",
    });
  }
}

export async function UserAllFeedbacks(c: Context) {
  const givenBy: string = c.get("userId");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userFeedbacks = await prisma.feedback.findMany({
      where: {
        givenBy,
      },
      select: {
        id: true,
        feedback: true,
        createdAt: true,
        book: {
          select: {
            name: true,
            author: true,
          },
        },
      },
    });

    if (!userFeedbacks) throw new Error();

    return c.json({
      success: true,
      status: 200,
      userFeedbacks,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while fetching these feedback.",
    });
  }
}
