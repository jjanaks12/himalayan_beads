-- AlterTable
ALTER TABLE `addresses` MODIFY `type` ENUM('BILLING', 'SHIPPING', 'PERMANENT_ADDRESS') NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `company_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `companies` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address_id` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `vat_registered` BOOLEAN NOT NULL,
    `pan_no` VARCHAR(191) NULL,
    `vat_no` VARCHAR(191) NULL,
    `image_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
