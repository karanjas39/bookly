import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_createGenre,
  z_createGenre_type,
} from "@singhjaskaran/bookly-common";

export async function AddGenre(c: Context) {
  const body: z_createGenre_type = await c.req.json();

  const { success, data } = z_createGenre.safeParse(body);

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

    const newGenre = await prisma.genre.create({
      data: {
        name: data.name,
      },
    });

    if (!newGenre) throw new Error();

    return c.json({
      success: true,
      status: 200,
      newGenre,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: "[Error] while creating new genre.",
    });
  }
}

export async function AllGenres(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const allGenres = await prisma.genre.findMany();

    if (!allGenres.length) throw new Error();

    return c.json({
      success: true,
      status: 200,
      allGenres,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 400,
      message: "[Error] while fetching all genres.",
    });
  }
}
