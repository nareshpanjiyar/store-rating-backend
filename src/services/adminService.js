const bcrypt = require("bcryptjs");

const prisma = require("../config/prisma");

class AdminService {
  async getDashboardStats() {
    const users = await prisma.user.count();

    const stores = await prisma.store.count();

    const ratings = await prisma.rating.count();

    return {
      totalUsers: users,
      totalStores: stores,
      totalRatings: ratings,
    };
  }

  async createUser(data) {
    const exists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (exists) {
      throw new Error("Email already exists");
    }

    const password = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        ...data,
        password,
      },
    });
  }

  async createStore(data) {
    const owner = await prisma.user.findUnique({
      where: {
        id: data.ownerId,
      },
    });

    if (!owner) {
      throw new Error("Owner not found");
    }

    if (owner.role !== "STORE_OWNER") {
      throw new Error("User must have STORE_OWNER role");
    }

    const existingStore = await prisma.store.findFirst({
      where: {
        ownerId: data.ownerId,
        name: data.name,
        address: data.address,
      },
    });

    if (existingStore) {
      throw new Error(
        "A store with the same name and address already exists for this owner",
      );
    }

    return prisma.store.create({
      data,
    });
  }

  async getUsers(query) {
    const {
      name,
      email,
      address,
      role,
      sortBy = "name",
      order = "asc",
    } = query;

    return prisma.user.findMany({
      where: {
        name: {
          contains: name || "",
          mode: "insensitive",
        },

        email: {
          contains: email || "",
          mode: "insensitive",
        },

        address: {
          contains: address || "",
          mode: "insensitive",
        },

        ...(role ? { role } : {}),
      },

      orderBy: {
        [sortBy]: order,
      },

      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
    });
  }

  async getStores(query) {
    const { name, email, address, sortBy = "name", order = "asc" } = query;

    const stores = await prisma.store.findMany({
      where: {
        name: {
          contains: name || "",
          mode: "insensitive",
        },

        email: {
          contains: email || "",
          mode: "insensitive",
        },

        address: {
          contains: address || "",
          mode: "insensitive",
        },
      },

      orderBy: {
        [sortBy]: order,
      },

      include: {
        ratings: true,

        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return stores.map((store) => {
      const avg = store.ratings.length
        ? (
            store.ratings.reduce((sum, r) => sum + r.rating, 0) /
            store.ratings.length
          ).toFixed(1)
        : 0;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: avg,

        owner: store.owner
          ? {
              name: store.owner.name,
              email: store.owner.email,
            }
          : null,
      };
    });
  }

  async getUserDetails(id) {
    const user = await prisma.user.findUnique({
      where: { id },

      include: {
        store: {
          include: {
            ratings: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let ownerRating = null;

    if (user.role === "STORE_OWNER" && user.store) {
      const ratings = user.store.ratings;

      ownerRating = ratings.length
        ? (
            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          ).toFixed(1)
        : 0;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      rating: ownerRating,
    };
  }

  async deleteUser(userId) {
    return prisma.$transaction(async (tx) => {
      await tx.rating.deleteMany({
        where: {
          userId,
        },
      });

      const stores = await tx.store.findMany({
        where: {
          ownerId: userId,
        },
        select: {
          id: true,
        },
      });

      await tx.rating.deleteMany({
        where: {
          storeId: {
            in: stores.map((s) => s.id),
          },
        },
      });

      await tx.store.deleteMany({
        where: {
          ownerId: userId,
        },
      });

      await tx.user.delete({
        where: {
          id: userId,
        },
      });

      return true;
    });
  }
}

module.exports = new AdminService();
