require("dotenv").config();

const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Admin@123", 10);

  const adminExists = await prisma.user.findUnique({
    where: {
      email: "admin@store.com",
    },
  });

  if (!adminExists) {
    await prisma.user.create({
      data: {
        name: "System Administrator Account",
        email: "admin@store.com",
        password,
        address: "System Address",
        role: "ADMIN",
      },
    });

    console.log("Admin user created");
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
