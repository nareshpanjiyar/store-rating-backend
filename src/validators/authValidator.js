const { z } = require("zod");

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;

const registerSchema = z.object({
  name: z.string().min(20).max(60),

  email: z.string().email(),

  address: z.string().max(400),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must contain uppercase and special character",
    ),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().regex(passwordRegex),
});

module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
};
