"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type IngredientInput = {
  name: string;
  quantity: number | null;
  unit: string | null;
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

export async function createRecipe(input: CreateRecipeInput) {
  await prisma.recipe.create({
    data: {
      title: input.title,
      imageUrl: input.imageUrl,
      baseServings: input.baseServings,
      sourceName: input.sourceName,
      sourceUrl: input.sourceUrl,
      steps: input.steps,
      ingredients: {
        create: await Promise.all(
          input.ingredients.map(async (ing) => {
            const ingredient = await prisma.ingredient.upsert({
              where: { name: ing.name },
              update: {},
              create: { name: ing.name },
            });

            return {
              ingredientId: ingredient.id,
              quantity: ing.quantity,
              unit: ing.unit as never, // narrowed to the Unite num by the <select>
              note: ing.note,
              position: ing.position,
            };
          }),
        ),
      },
    },
  });

  revalidatePath("/recipes");
}
