"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
              quantityMax: ing.quantityMax,
              unit: ing.unit as never, // narrowed to the Unite num by the <select>
              customUnit: ing.customUnit,
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

export async function updateRecipe(id: string, input: CreateRecipeInput) {
  await prisma.$transaction(async (tx) => {
    await tx.recipeIngredient.deleteMany({ where: { recipeId: id } });

    await tx.recipe.update({
      where: { id },
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
              const ingredient = await tx.ingredient.upsert({
                where: { name: ing.name },
                update: {},
                create: { name: ing.name },
              });

              return {
                ingredientId: ingredient.id,
                quantity: ing.quantity,
                quantityMax: ing.quantityMax,
                unit: ing.unit as never,
                customUnit: ing.customUnit,
                note: ing.note,
                position: ing.position,
              };
            }),
          ),
        },
      },
    });
  });

  revalidatePath("/recipes");
  revalidatePath(`/recipes/${id}`);
}
