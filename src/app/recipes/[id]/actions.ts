"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRecipe(id: string) {
  await prisma.recipe.delete({ where: { id } });

  revalidatePath("/recipes");
  revalidatePath("/");
}
