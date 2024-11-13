/*
  Warnings:

  - You are about to drop the `price_on_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `price_on_product` DROP FOREIGN KEY `price_on_product_product_id_fkey`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `price_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `price_on_product`;

-- DropTable
DROP TABLE `prices`;

-- CreateTable
CREATE TABLE `Price` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `parent_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Price`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
