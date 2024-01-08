/*
  Warnings:

  - Added the required column `testMode` to the `QueryResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QueryResult" ADD COLUMN     "testMode" BOOLEAN NOT NULL;
