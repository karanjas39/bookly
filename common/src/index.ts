import { z } from "zod";

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
  listed: z.boolean().optional(),
});

export const z_myBooks = z.object({ listed: z.string() });

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

export const z_createGenre = z.object({
  name: z.string(),
});
// TYPES
export type z_signUp_type = z.infer<typeof z_signUp>;

export type z_singIn_type = z.infer<typeof z_singIn>;

export type z_updatePassword_type = z.infer<typeof z_updatePassword>;

export type z_sellBook_type = z.infer<typeof z_sellBook>;

export type z_myBooks_type = z.infer<typeof z_myBooks>;

export type z_updateSellBook_type = z.infer<typeof z_updateSellBook>;

export type z_id_type = z.infer<typeof z_id>;

export type z_createFeedback_type = z.infer<typeof z_createFeedback>;

export type z_createBuyRequest_type = z.infer<typeof z_createBuyRequest>;

export type z_createGenre_type = z.infer<typeof z_createGenre>;
