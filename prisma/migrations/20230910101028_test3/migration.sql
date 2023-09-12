/*
  Warnings:

  - You are about to drop the column `create` on the `todo` table. All the data in the column will be lost.
  - Added the required column `complete` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` DROP COLUMN `create`,
    ADD COLUMN `complete` BOOLEAN NOT NULL,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
