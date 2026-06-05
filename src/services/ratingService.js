const prisma = require("../config/prisma");

class RatingService {
  async submitRating(userId, storeId, rating) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    const existing = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (existing) {
      throw new Error("Rating already submitted. Use update API.");
    }

    return prisma.rating.create({
      data: {
        userId,
        storeId,
        rating,
      },
    });
  }

  async updateRating(userId, storeId, rating) {
    const existing = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (!existing) {
      throw new Error("Rating not found");
    }

    return prisma.rating.update({
      where: {
        id: existing.id,
      },

      data: {
        rating,
      },
    });
  }
}

module.exports = new RatingService();
