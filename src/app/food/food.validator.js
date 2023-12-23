const { z } = require('zod');

const foodCreateSchema = z.object({
    title: z.string().min(2),
    description: z.string().nullable(),
    category: z.string().nullable(),
    price: z.string().regex(/^\d+$/).min(1),
    discount: z.string().regex(/^\d+$/).max(99).nullable(),
    tags: z.string().nullable(),
    status: z.string().regex(/active|inactive/)
})

const reviewSchema = z.object({
    rating: z.string().regex(/^[0-5]$/),
    comment: z.string().max(50)
})

module.exports = { foodCreateSchema, reviewSchema }