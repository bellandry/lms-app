-- AlterTable
ALTER TABLE `Category` ADD COLUMN `enable` BOOLEAN NULL,
    ADD COLUMN `isAiGeneration` BOOLEAN NULL DEFAULT false;
