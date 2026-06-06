const prisma = require("../config/prisma");

class OwnerService {
  async getDashboard(ownerId, storeId) {
    const stores = await prisma.store.findMany({
      where: {
        ownerId,
      },

      select: {
        id: true,
        name: true,
        email: true,
        address: true,
      },

      orderBy: {
        name: "asc",
      },
    });

    if (!stores.length) {
      throw new Error("No stores assigned to owner");
    }

    const selectedStoreId = storeId || stores[0].id;

    const store = await prisma.store.findUnique({
      where: {
        ownerId: ownerId,
        id: selectedStoreId,
      },

      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                address: true,
              },
            },
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    const totalRatings = store.ratings.length;

    const averageRating =
      totalRatings > 0
        ? Number(
            (
              store.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
            ).toFixed(1),
          )
        : 0;

    const submittedUsers = store.ratings.map((rating) => ({
      ratingId: rating.id,

      rating: rating.rating,

      user: {
        id: rating.user.id,
        name: rating.user.name,
        email: rating.user.email,
        address: rating.user.address,
      },

      submittedAt: rating.createdAt,
    }));

    return {
      stores,

      selectedStore: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
      },

      averageRating,
      totalRatings,
      submittedUsers,
    };
  }
}

module.exports = new OwnerService();
