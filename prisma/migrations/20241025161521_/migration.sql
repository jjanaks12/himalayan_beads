/*
  Warnings:

  - You are about to drop the `category_on_image` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `category_on_image` DROP FOREIGN KEY `category_on_image_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `category_on_image` DROP FOREIGN KEY `category_on_image_image_id_fkey`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `image_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `image_on_product` ADD COLUMN `image_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `category_on_image`;

-- CreateIndex
CREATE UNIQUE INDEX `categories_image_id_key` ON `categories`(`image_id`);

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_on_product` ADD CONSTRAINT `image_on_product_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
