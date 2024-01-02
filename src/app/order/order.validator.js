const { z } = require('zod');

const selectionSchema = z.object({
    foodId: z.string().max(24),
    qty: z.string().regex(/^\d+$/).min(1)
})

module.exports = {selectionSchema}