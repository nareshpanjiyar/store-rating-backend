/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,name,address]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Store_ownerId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Store_ownerId_name_address_key" ON "Store"("ownerId", "name", "address");
