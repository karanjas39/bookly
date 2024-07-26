import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z_sellBook } from "../utils/zod.types";
import { z } from "zod";

export async function SellBook(c: Context) {
  const userId: string = c.get("userId");
  const body: z.infer<typeof z_sellBook> = await c.req.json();

  const { success } = z_sellBook.safeParse(body);

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

    const newBook = await prisma.book.create({
      data: {
        name: body.name,
        description: body.description || "",
        author: body.author,
        price: body.price,
        genreId: body.genreId,
        sellerId: userId,
      },
    });

    if (!newBook) throw new Error();

    return c.json({
      success: true,
      status: 200,
      newBook,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "Error while listing this book.",
    });
  }
}

async function UpdateBook(c: Context) {
  const userId: string = c.get("userId");
  const body: z.infer<typeof z_sellBook> = await c.req.json();
}
