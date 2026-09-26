"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/get-session";
import { revalidatePath } from "next/cache";

export async function deleteRecipe(id: string) {
  const session = await requireAuth();
  if (!session) throw new Error("Niet geautoriseerd.");
  
  await prisma.recipe.delete({ where: { id } });

  revalidatePath("/recipes");
  revalidatePath("/");
}
