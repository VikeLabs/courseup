/*
  Warnings:

  - You are about to drop the `FacultiesOnSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FacultiesOnSection" DROP CONSTRAINT "FacultiesOnSection_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "FacultiesOnSection" DROP CONSTRAINT "FacultiesOnSection_sectionId_fkey";

-- DropTable
DROP TABLE "FacultiesOnSection";

-- DropTable
DROP TABLE "Faculty";
