const { z } = require('zod');

const categoryCreateSchema = z.object({
    title: z.string().min(2),
    parentId: z.string().nullable(),
    status: z.string().regex(/active|inactive/)
})

module.exports = { categoryCreateSchema }