import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_createBuyRequest,
  z_createBuyRequest_type,
  z_id,
  z_id_type,
} from "@singhjaskaran/bookly-common";

export async function CreateBuyRequest(c: Context) {
  const userId: string = c.get("userId");
  const body: z_createBuyRequest_type = await c.req.json();

  const { success, data } = z_createBuyRequest.strip().safeParse(body);

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

    const isBookAvailable = await prisma.book.findUnique({
      where: {
        id: body.bookId,
      },
    });

    if (
      isBookAvailable &&
      (isBookAvailable.sold ||
        !isBookAvailable.listed ||
        isBookAvailable.sellerId === userId)
    )
      throw new Error();

    const isAlreadyRequested = await prisma.buyRequest.findFirst({
      where: {
        bookId: body.bookId,
        userId,
      },
    });

    if (isAlreadyRequested) throw new Error();

    const newBookRequest = await prisma.buyRequest.create({
      data: {
        bookId: data.bookId,
        userId,
      },
    });

    if (!newBookRequest) throw new Error();

    return c.json({
      success: true,
      status: 200,
      newBookRequest,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while creating book buyrequest.",
    });
  }
}

export async function AcceptBuyrequest(c: Context) {
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

    const buyRequest = await prisma.buyRequest.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!buyRequest) throw new Error();

    const bookToBeSold = await prisma.book.findUnique({
      where: {
        id: buyRequest.bookId,
        sellerId: userId,
      },
    });

    if (!bookToBeSold || bookToBeSold.sold || !bookToBeSold.listed)
      throw new Error();

    await prisma.book.update({
      where: {
        id: buyRequest.bookId,
      },
      data: {
        sold: true,
        listed: false,
        buyerId: buyRequest.userId,
      },
    });

    return c.json({
      success: true,
      status: 200,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while accepting book buy request.",
    });
  }
}

export async function AllBuyRequest(c: Context) {
  const userId: string = c.get("userId");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const buyRequests = await prisma.book.findMany({
      where: {
        sellerId: userId,
        listed: true,
        sold: false,
      },
      select: {
        buyRequests: {
          select: {
            id: true,
            book: {
              select: {
                name: true,
                author: true,
              },
            },
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!buyRequests.length) throw new Error();

    return c.json({
      success: true,
      status: 200,
      buyRequests,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while listing this book.",
    });
  }
}

export async function AllAcceptedBuyRequest(c: Context) {
  const userId: string = c.get("userId");

  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const acceptedBuyRequests = await prisma.book.findMany({
      where: {
        buyerId: userId,
      },
      select: {
        id: true,
        name: true,
        author: true,
        seller: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      status: 200,
      acceptedBuyRequests,
    });
  } catch (error) {
    return c.json({
      success: false,
      status: 404,
      message: "[Error] while fetching accepted buy reqs.",
    });
  }
}
