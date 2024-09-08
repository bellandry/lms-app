/*
  Warnings:

  - You are about to drop the column `meta_description` on the `course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `course` DROP COLUMN `meta_description`,
    ADD COLUMN `metaDescription` TEXT NULL;
