-- DropForeignKey
ALTER TABLE `tbl_professional_category` DROP FOREIGN KEY `tbl_professional_category_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_professional_category` DROP FOREIGN KEY `tbl_professional_category_professional_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_scheduling` DROP FOREIGN KEY `tbl_scheduling_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_scheduling` DROP FOREIGN KEY `tbl_scheduling_professional_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_scheduling` DROP FOREIGN KEY `tbl_scheduling_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_scheduling` DROP FOREIGN KEY `tbl_scheduling_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_service` DROP FOREIGN KEY `tbl_service_category_id_fkey`;

-- AddForeignKey
ALTER TABLE `tbl_professional_category` ADD CONSTRAINT `tbl_professional_category_professional_id_fkey` FOREIGN KEY (`professional_id`) REFERENCES `tbl_professional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_professional_category` ADD CONSTRAINT `tbl_professional_category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tbl_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_service` ADD CONSTRAINT `tbl_service_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `tbl_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_scheduling` ADD CONSTRAINT `tbl_scheduling_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `tbl_client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_scheduling` ADD CONSTRAINT `tbl_scheduling_professional_id_fkey` FOREIGN KEY (`professional_id`) REFERENCES `tbl_professional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_scheduling` ADD CONSTRAINT `tbl_scheduling_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `tbl_service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_scheduling` ADD CONSTRAINT `tbl_scheduling_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `tbl_status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
