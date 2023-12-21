const { z } = require('zod');

const foodCreateSchema = z.object({
    title: z.string().min(2),
    description: z.string.nullable(),
    category: z.string().nullable(),
    price: z.string().regex(/^\d+$/).min(1),
    discount: z.string().regex(/^\d+$/).min(0).max(99).nullable(),
    tags: z.string().nullable(),
    status: z.string().regex(/active|inactive/)
})

module.exports = { foodCreateSchema }