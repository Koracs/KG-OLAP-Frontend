-- AlterTable
ALTER TABLE "QueryResult" ALTER COLUMN "ts_start" DROP NOT NULL,
ALTER COLUMN "ts_0" DROP NOT NULL,
ALTER COLUMN "ts_1" DROP NOT NULL,
ALTER COLUMN "ts_2" DROP NOT NULL,
ALTER COLUMN "ts_3" DROP NOT NULL,
ALTER COLUMN "ts_end" DROP NOT NULL,
ALTER COLUMN "context_count" DROP NOT NULL,
ALTER COLUMN "quad_count" DROP NOT NULL,
ALTER COLUMN "char_count" DROP NOT NULL;