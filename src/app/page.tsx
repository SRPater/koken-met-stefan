import { prisma } from "@/lib/prisma";
import { RecipeCarousel } from "./recipe-carousel";

export default async function HomePage() {
  const newest = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    select: { id: true, title: true, imageUrl: true },
  });

  const random = await prisma.$queryRaw<
    { id: string; title: string; imageUrl: string | null }[]
  >`SELECT id, title, "imageUrl" FROM "Recipe" ORDER BY RANDOM() LIMIT 6`;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10">
      <section>
        <h2 className="font-gaegu text-2xl text-stone-800 dark:text-stone-200">
          Nieuwste recepten
        </h2>
        <div className="mt-3">
          <RecipeCarousel recipes={newest} />
        </div>
      </section>

      <section>
        <h2 className="font-gaegu text-2xl text-stone-800 dark:text-stone-200">
          Willekeurige recepten
        </h2>
        <div className="mt-3">
          <RecipeCarousel recipes={random} />
        </div>
      </section>
    </div>
  );
}
