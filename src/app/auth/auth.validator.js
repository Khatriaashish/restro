const { z } = require('zod');

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email()
})

const passwordSchema = z.object({
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    confirmPassword: z.string().min(1)
}).refine((data)=>data.password===data.confirmPassword, {
    message: "Password and confirm password doesn't match",
    path: "confirmPassword"
})

const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1)
})

const emailSchema = z.object({
    email: z.string().email()
})

module.exports = {registerSchema, passwordSchema, loginSchema, emailSchema}