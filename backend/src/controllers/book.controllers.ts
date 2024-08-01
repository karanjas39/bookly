import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_id,
  z_id_type,
  z_sellBook,
  z_sellBook_type,
  z_updateSellBook,
  z_updateSellBook_type,
} from "@singhjaskaran/bookly-common";

export async function SellBook(c: Context) {
  const userId: string = c.get("userId");
  const body: z_sellBook_type = await c.req.json();

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
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while listing this book.",
    });
  }
}

export async function UpdateBook(c: Context) {
  const userId: string = c.get("userId");
  const body: z_updateSellBook_type = await c.req.json();

  const { success, data } = z_updateSellBook.strip().safeParse(body);

  if (!success) {
    return c.json({
      success: false,
      status: 404,
      message: "Invalid inputs are passed.",
    });
  }

  try {
    const { id, ...dataToUpdate } = data;

    if (!Object.keys(dataToUpdate).length) throw new Error();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const updatedBook = await prisma.book.update({
      where: {
        id: body.id,
        sellerId: userId,
      },
      data: dataToUpdate,
    });

    if (!updatedBook) throw new Error();

    return c.json({
      success: true,
      status: 200,
      updatedBook,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while updating this book.",
    });
  }
}

export async function DeleteBook(c: Context) {
  const userId: string = c.get("userId");
  const body: z_id_type = await c.req.json();

  const { success, data } = z_id.strip().safeParse(body);

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

    const deletedBook = await prisma.book.delete({
      where: {
        id: data.id,
        sellerId: userId,
      },
    });

    if (!deletedBook) throw new Error();

    return c.json({
      success: true,
      status: 200,
      deletedBook,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while deleting this book.",
    });
  }
}

export async function GetBook(c: Context) {
  const params = c.req.param();
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

    const book = await prisma.book.findUnique({
      where: {
        id: data.id,
        listed: true,
      },
      select: {
        name: true,
        description: true,
        author: true,
        createdAt: true,
        price: true,
        feedbacks: true,
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        genre: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!book) throw new Error();

    return c.json({
      success: true,
      status: 200,
      book,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while fetching this book.",
    });
  }
}

export async function GetBooks(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const books = await prisma.book.findMany({
      where: {
        listed: true,
        sold: false,
      },
      select: {
        name: true,
        author: true,
        createdAt: true,
        price: true,
      },
    });

    if (!books.length) throw new Error();

    return c.json({
      success: true,
      status: 200,
      books,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while fetching this book.",
    });
  }
}

export async function GetMyBooks(c: Context) {
  const userId: string = c.get("userId");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const books = await prisma.book.findMany({
      where: {
        sellerId: userId,
      },
      select: {
        name: true,
        createdAt: true,
        price: true,
        listed: true,
        id: true,
      },
    });

    if (!books.length) throw new Error();

    return c.json({
      success: true,
      status: 200,
      books,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while fetching your books.",
    });
  }
}
