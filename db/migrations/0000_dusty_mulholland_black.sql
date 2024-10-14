CREATE TABLE IF NOT EXISTS "votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"option" text NOT NULL,
	"ip_address" text NOT NULL
);
