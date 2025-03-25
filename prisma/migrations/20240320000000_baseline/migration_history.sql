-- Create the schema_migrations table if it doesn't exist
CREATE TABLE IF NOT EXISTS "auth"."schema_migrations" (
    "version" VARCHAR(255) NOT NULL,
    CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version")
);

-- Insert the baseline migration into the schema_migrations table
INSERT INTO "auth"."schema_migrations" (version) VALUES ('20240320000000_baseline'); 