const { z } = require('zod');

const bannerCreateSchema = z.object({
    title: z.string().min(2),
    url: z.string().url(),
    status: z.string().regex(/active|inactive/)
})

module.exports = { bannerCreateSchema }