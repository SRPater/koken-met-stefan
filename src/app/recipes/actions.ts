"use server";

import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 12;

export async function getRecipes(skip: number) {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: PAGE_SIZE,
    select: {
      id: true,
      title: true,
      imageUrl: true,
      sourceName: true,
    },
  });

  const hasMore = recipes.length === PAGE_SIZE;

  return { recipes, hasMore };
}