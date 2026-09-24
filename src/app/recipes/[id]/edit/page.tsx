import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RecipeForm } from "../../new/recipe-form";
import { DeleteButton } from "./delete-button";

export default async function EditRecipePage({
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
          href={`/recipes/${recipe.id}`}
          className="text-sm text-stone-500 hover:text-crimson dark:hover:text-cyan"
        >
          ← Terug naar recept
        </Link>
        <DeleteButton recipeId={recipe.id} />
      </div>
      
      <h1 className="font-gaegu text-3xl text-stone-800 dark:text-stone-200">
        Recept bewerken
      </h1>
      <div className="mt-6">
        <RecipeForm
          recipeId={recipe.id}
          initialData={{
            title: recipe.title,
            imageUrl: recipe.imageUrl ?? "",
            baseServings: recipe.baseServings,
            sourceName: recipe.sourceName ?? "",
            sourceUrl: recipe.sourceUrl ?? "",
            steps: recipe.steps,
            ingredients: recipe.ingredients.map((ri) => ({
              name: ri.ingredient.name,
              quantity:
                ri.quantityMax !== null
                  ? `${ri.quantity ?? ""}-${ri.quantityMax}`
                  : (ri.quantity?.toString() ?? ""),
              unit: ri.customUnit ? "CUSTOM" : (ri.unit ?? ""),
              customUnit: ri.customUnit ?? "",
              note: ri.note ?? "",
            })),
          }}
        />
      </div>
    </div>
  );
}
