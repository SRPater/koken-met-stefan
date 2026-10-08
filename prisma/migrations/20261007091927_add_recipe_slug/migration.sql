/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- Add the column as nullable first, so existing rows don't break
ALTER TABLE "Recipe" ADD COLUMN     "slug" TEXT;

-- Backfill: lowercase the title, replace anything that isn't a-z/0-9 with a
-- hyphen, and trim stray leading/trailing hyphens
UPDATE "Recipe"
SET "slug" = trim(both '-' from regexp_replace(lower(trim("title")), '[^a-z0-9]+', '-', 'g'));

-- Now that every row has a value, make it required and unique
ALTER TABLE "Recipe" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");
