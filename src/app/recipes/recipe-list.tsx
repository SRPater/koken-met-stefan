"use client";

import { useState } from "react";
import { RecipeCard } from "./recipe-card";
import { getRecipes } from "./actions";

type Recipe = {
  id: string;
  title: string;
  imageUrl: string | null;
  sourceName: string | null;
};

export function RecipeList({
  initialRecipes,
  initialHasMore,
}: {
  initialRecipes: Recipe[];
  initialHasMore: boolean;
}) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    const { recipes: more, hasMore: moreLeft } = await getRecipes(
      recipes.length,
    );
    setRecipes((prev) => [...prev, ...more]);
    setHasMore(moreLeft);
    setLoading(false);
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center text-stone-500">
        <p>Geen recepten gevonden.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded border border-crimson px-6 py-2 text-crimson disabled:opacity-50 dark:border-cyan dark:text-cyan"
          >
            {loading ? "Laden..." : "Meer recepten laden"}
          </button>
        </div>
      )}
    </div>
  );
}
