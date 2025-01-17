/*
  Warnings:

  - Added the required column `nama` to the `Komentar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Komentar" ADD COLUMN     "nama" TEXT NOT NULL;
