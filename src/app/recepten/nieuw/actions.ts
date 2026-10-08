"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/get-session";
import { slugify } from "@/lib/slugify";

type IngredientInput = {
  name: string;
  quantity: number | null;
  quantityMax: number | null;
  unit: string | null;
  customUnit?: string;
  note?: string;
  position: number;
};

type CreateRecipeInput = {
  title: string;
  imageUrl?: string;
  baseServings: number;
  sourceName?: string;
  sourceUrl?: string;
  steps: string[];
  ingredients: IngredientInput[];
};

async function buildIngredientRecords(
  ingredients: IngredientInput[],
  client: typeof prisma,
) {
  const records = [];

  for (const ing of ingredients) {
    const ingredient = await client.ingredient.upsert({
      where: { name: ing.name },
      update: {},
      create: { name: ing.name },
    });

    records.push({
      ingredientId: ingredient.id,
      quantity: ing.quantity,
      quantityMax: ing.quantityMax,
      unit: ing.unit as never,
      customUnit: ing.customUnit,
      note: ing.note,
      position: ing.position,
    });
  }

  return records;
}

async function generateUniqueSlug(title: string): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let suffix = 2;

  while (await prisma.recipe.findUnique({ where: { slug } })) {
    slug = `${base}-${suffix}`;
    suffix++;
  }

  return slug;
}

export async function createRecipe(input: CreateRecipeInput) {
  const session = await requireAuth();
  if (!session) throw new Error("Niet geautoriseerd.");

  const ingredientRecords = await buildIngredientRecords(
    input.ingredients,
    prisma,
  );

  const slug = await generateUniqueSlug(input.title);

  await prisma.recipe.create({
    data: {
      title: input.title,
      slug,
      imageUrl: input.imageUrl,
      baseServings: input.baseServings,
      sourceName: input.sourceName,
      sourceUrl: input.sourceUrl,
      steps: input.steps,
      ingredients: {
        create: ingredientRecords,
      },
    },
  });

  revalidatePath("/recepten");
}

export async function updateRecipe(id: string, input: CreateRecipeInput) {
  const session = await requireAuth();
  if (!session) throw new Error("Niet geautoriseerd.");
  
  const recipe = await prisma.$transaction(async (tx) => {
    await tx.recipeIngredient.deleteMany({ where: { recipeId: id } });

    const ingredientRecords = await buildIngredientRecords(
      input.ingredients,
      tx as unknown as typeof prisma,
    );

    return tx.recipe.update({
      where: { id },
      data: {
        title: input.title,
        imageUrl: input.imageUrl,
        baseServings: input.baseServings,
        sourceName: input.sourceName,
        sourceUrl: input.sourceUrl,
        steps: input.steps,
        ingredients: {
          create: ingredientRecords,
        },
      },
    });
  });

  revalidatePath("/recepten");
  revalidatePath(`/recepten/${recipe.slug}`);
}
