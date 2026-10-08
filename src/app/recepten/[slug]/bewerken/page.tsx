import Link from "next/link";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/get-session";
import { RecipeForm } from "../../nieuw/recipe-form";
import { DeleteButton } from "./delete-button";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await requireAuth();
  if (!session) redirect("/login");

  const { slug } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: { slug },
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
          href={`/recepten/${recipe.slug}`}
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
          recipeSlug={recipe.slug}
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
