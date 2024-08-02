"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z_createGenre = exports.z_createBuyRequest = exports.z_createFeedback = exports.z_id = exports.z_updateSellBook = exports.z_myBooks = exports.z_sellBook = exports.z_updatePassword = exports.z_singIn = exports.z_signUp = void 0;
const zod_1 = require("zod");
exports.z_signUp = zod_1.z.object({
    name: zod_1.z.string(),
    password: zod_1.z.string().min(6),
    email: zod_1.z.string().email(),
});
exports.z_singIn = zod_1.z.object({
    password: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
exports.z_updatePassword = zod_1.z.object({
    prevPassword: zod_1.z.string().min(6),
    currPassword: zod_1.z.string().min(6),
});
exports.z_sellBook = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    author: zod_1.z.string(),
    price: zod_1.z.number(),
    genreId: zod_1.z.string().uuid(),
    listed: zod_1.z.boolean().optional(),
});
exports.z_myBooks = zod_1.z.object({ listed: zod_1.z.string() });
exports.z_updateSellBook = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    genreId: zod_1.z.string().uuid().optional(),
    listed: zod_1.z.boolean().optional(),
});
exports.z_id = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.z_createFeedback = zod_1.z.object({
    feedback: zod_1.z.string(),
    bookId: zod_1.z.string().uuid(),
});
exports.z_createBuyRequest = zod_1.z.object({
    bookId: zod_1.z.string().uuid(),
});
exports.z_createGenre = zod_1.z.object({
    name: zod_1.z.string(),
});
