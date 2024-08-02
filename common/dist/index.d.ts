import { z } from "zod";
export declare const z_signUp: z.ZodObject<{
    name: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    password: string;
    email: string;
}, {
    name: string;
    password: string;
    email: string;
}>;
export declare const z_singIn: z.ZodObject<{
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
}, {
    password: string;
    email: string;
}>;
export declare const z_updatePassword: z.ZodObject<{
    prevPassword: z.ZodString;
    currPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    prevPassword: string;
    currPassword: string;
}, {
    prevPassword: string;
    currPassword: string;
}>;
export declare const z_sellBook: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    author: z.ZodString;
    price: z.ZodNumber;
    genreId: z.ZodString;
    listed: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    author: string;
    price: number;
    genreId: string;
    description?: string | undefined;
    listed?: boolean | undefined;
}, {
    name: string;
    author: string;
    price: number;
    genreId: string;
    description?: string | undefined;
    listed?: boolean | undefined;
}>;
export declare const z_myBooks: z.ZodObject<{
    listed: z.ZodString;
}, "strip", z.ZodTypeAny, {
    listed: string;
}, {
    listed: string;
}>;
export declare const z_updateSellBook: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    genreId: z.ZodOptional<z.ZodString>;
    listed: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    author?: string | undefined;
    price?: number | undefined;
    genreId?: string | undefined;
    listed?: boolean | undefined;
}, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    author?: string | undefined;
    price?: number | undefined;
    genreId?: string | undefined;
    listed?: boolean | undefined;
}>;
export declare const z_id: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const z_createFeedback: z.ZodObject<{
    feedback: z.ZodString;
    bookId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    feedback: string;
    bookId: string;
}, {
    feedback: string;
    bookId: string;
}>;
export declare const z_createBuyRequest: z.ZodObject<{
    bookId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bookId: string;
}, {
    bookId: string;
}>;
export declare const z_createGenre: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
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
