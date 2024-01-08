-- CreateTable
CREATE TABLE "QueryResult" (
    "id" TEXT NOT NULL,
    "queryText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ts_start" TIMESTAMP(3) NOT NULL,
    "ts_0" TIMESTAMP(3) NOT NULL,
    "ts_1" TIMESTAMP(3) NOT NULL,
    "ts_2" TIMESTAMP(3) NOT NULL,
    "ts_3" TIMESTAMP(3) NOT NULL,
    "ts_end" TIMESTAMP(3) NOT NULL,
    "context_count" INTEGER NOT NULL,
    "quad_count" INTEGER NOT NULL,
    "char_count" INTEGER NOT NULL,

    CONSTRAINT "QueryResult_pkey" PRIMARY KEY ("id")
);
