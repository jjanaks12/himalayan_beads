/*
  Warnings:

  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Price`;

-- CreateTable
CREATE TABLE `prices` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
