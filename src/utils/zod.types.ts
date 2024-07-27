import { string, z } from "zod";

export const z_signUp = z.object({
  name: z.string(),
  password: z.string().min(6),
  email: z.string().email(),
});

export const z_singIn = z.object({
  password: z.string(),
  email: z.string().email(),
});

export const z_updatePassword = z.object({
  prevPassword: z.string().min(6),
  currPassword: z.string().min(6),
});

export const z_sellBook = z.object({
  name: z.string(),
  description: z.string().optional(),
  author: z.string(),
  price: z.number(),
  genreId: z.string().uuid(),
});

export const z_updateSellBook = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  price: z.number().optional(),
  genreId: z.string().uuid().optional(),
  listed: z.boolean().optional(),
});

export const z_id = z.object({
  id: z.string().uuid(),
});

export const z_createFeedback = z.object({
  feedback: z.string(),
  bookId: z.string().uuid(),
});

export const z_createBuyRequest = z.object({
  bookId: z.string().uuid(),
});
