import { prisma } from "@/lib/prisma";
import { RecipeList } from "./recipe-list";

const PAGE_SIZE = 12;

export default async function RecipesPage() {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE,
    select: {
      id: true,
      slug: true,
      title: true,
      imageUrl: true,
      sourceName: true,
    },
  });

  const hasMore = recipes.length === PAGE_SIZE;

  return (
    <div className="mx-auto max-w-6xl">
      <RecipeList initialRecipes={recipes} initialHasMore={hasMore} />
    </div>
  );
}
