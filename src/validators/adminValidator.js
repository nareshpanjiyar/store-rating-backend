const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(20).max(60),
  email: z.string().email(),
  address: z.string().max(400),
  password: z.string(),
  role: z.enum(["ADMIN", "USER", "STORE_OWNER"]),
});

const createStoreSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  address: z.string().max(400),
  ownerId: z.string(),
});

module.exports = {
  createUserSchema,
  createStoreSchema,
};
