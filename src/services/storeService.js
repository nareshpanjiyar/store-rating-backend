const prisma = require("../config/prisma");

class StoreService {
  async getStores(query, userId) {
    const { name = "", address = "", sortBy = "name", order = "asc" } = query;

    const stores = await prisma.store.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },

        address: {
          contains: address,
          mode: "insensitive",
        },
      },

      include: {
        ratings: true,
      },

      orderBy: {
        [sortBy]: order,
      },
    });

    return stores.map((store) => {
      const avgRating = store.ratings.length
        ? Number(
            (
              store.ratings.reduce((sum, r) => sum + r.rating, 0) /
              store.ratings.length
            ).toFixed(1),
          )
        : 0;

      const userRating = store.ratings.find(
        (rating) => rating.userId === userId,
      );

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,

        overallRating: avgRating,

        userRating: userRating?.rating || null,
      };
    });
  }

  async getStoreById(storeId, userId) {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },

      include: {
        ratings: true,
      },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    const avgRating = store.ratings.length
      ? Number(
          (
            store.ratings.reduce((sum, r) => sum + r.rating, 0) /
            store.ratings.length
          ).toFixed(1),
        )
      : 0;

    const userRating = store.ratings.find((rating) => rating.userId === userId);

    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,

      overallRating: avgRating,

      userRating: userRating?.rating || null,
    };
  }
}

module.exports = new StoreService();
