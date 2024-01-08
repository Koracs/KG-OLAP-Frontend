CREATE SCHEMA IF NOT EXISTS kgolap;
CREATE SCHEMA IF NOT EXISTS keycloak;

CREATE TABLE IF NOT EXISTS kgolap."QueryResult"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "queryText" text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    ts_start timestamp(3) without time zone,
    ts_0 timestamp(3) without time zone,
    ts_1 timestamp(3) without time zone,
    ts_2 timestamp(3) without time zone,
    ts_3 timestamp(3) without time zone,
    ts_end timestamp(3) without time zone,
    context_count integer,
    quad_count integer,
    char_count integer,
    "filename" text COLLATE pg_catalog."default",
    "testMode" boolean NOT NULL,
    CONSTRAINT "QueryResult_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;