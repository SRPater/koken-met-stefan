import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { IngredientList } from "./ingredient-list";
export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients: {
        orderBy: { position: "asc" },
        include: { ingredient: true },
      },
    },
  });

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/recipes"
          className="text-sm text-stone-500 hover:text-crimson dark:hover:text-cyan"
        >
          ← Alle recepten
        </Link>
        <Link
          href={`/recipes/${recipe.id}/edit`}
          className="text-sm text-crimson hover:underline dark:text-cyan"
        >
          Bewerken
        </Link>
      </div>

      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      <h1 className="font-gaegu mt-6 text-4xl text-stone-800 dark:text-stone-200">
        {recipe.title}
      </h1>

      {recipe.sourceName && (
        <p className="mt-1 text-stone-500">
          {recipe.sourceUrl ? (
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-crimson dark:hover:text-cyan hover:underline"
            >
              {recipe.sourceName}
            </a>
          ) : (
            recipe.sourceName
          )}
        </p>
      )}

      <div className="mt-8">
        <IngredientList
          baseServings={recipe.baseServings}
          ingredients={recipe.ingredients.map((ri) => ({
            id: ri.id,
            name: ri.ingredient.name,
            quantity: ri.quantity ? Number(ri.quantity) : null,
            quantityMax: ri.quantityMax ? Number(ri.quantityMax) : null,
            unit: ri.unit,
            customUnit: ri.customUnit,
            note: ri.note,
          }))}
        />
      </div>

      <div className="mt-10">
        <h2 className="font-gaegu text-2xl text-stone-800 dark:text-stone-200">
          Bereiding
        </h2>
        <ol className="mt-3 flex flex-col gap-4">
          {recipe.steps.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-crimson dark:text-cyan font-medium">
                {index + 1}.
              </span>
              <span className="text-stone-700 dark:text-stone-300">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
