DROP TABLE IF EXISTS "quiz_has_tag" CASCADE;
DROP TABLE IF EXISTS "answer" CASCADE;
DROP TABLE IF EXISTS "question" CASCADE;
DROP TABLE IF EXISTS "quiz" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "level" CASCADE;
DROP TABLE IF EXISTS "tag" CASCADE;

CREATE TABLE "level" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE "user" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" text NOT NULL UNIQUE,
  "password" text NOT NULL,
  "firstname" text NULL,
  "lastname" text NULL,
  "role" text NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE "quiz" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" text NOT NULL UNIQUE,
  "description" text NULL,
  "picture_url" text NULL,
  "user_id" integer NOT NULL REFERENCES "user"("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE "question" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "description" text NOT NULL UNIQUE,
  "anecdote" text NULL,
  "wiki" text NULL,
  "level_id" integer NOT NULL REFERENCES "level"("id"),
  "quiz_id" integer NOT NULL REFERENCES "quiz"("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE "answer" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "description" text NOT NULL,
  "question_id" integer NOT NULL,
  "is_valid" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);


CREATE TABLE "tag" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE "quiz_has_tag" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "quiz_id" integer NOT NULL REFERENCES "quiz"("id"),
  "tag_id" integer NOT NULL REFERENCES "tag"("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz,
  UNIQUE ("quiz_id", "tag_id")
);
