/*
  Warnings:

  - You are about to drop the column `price_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_price_id_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `price_id`;

-- DropTable
DROP TABLE `Price`;

-- CreateTable
CREATE TABLE `prices` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `parent_id` VARCHAR(191) NULL,
    `priceOnProductId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `price_on_product` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `price_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `price_on_product` ADD CONSTRAINT `price_on_product_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `prices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `price_on_product` ADD CONSTRAINT `price_on_product_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
