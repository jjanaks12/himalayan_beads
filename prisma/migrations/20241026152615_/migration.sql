-- AlterTable
ALTER TABLE `users` ADD COLUMN `image_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
