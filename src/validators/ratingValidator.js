const { z } = require("zod");

const ratingSchema = z.object({
  storeId: z.string(),
  rating: z.number().int().min(1).max(5),
});

module.exports = {
  ratingSchema,
};
