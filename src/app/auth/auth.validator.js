const { z } = require('zod');

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email()
})

module.exports = {registerSchema}