type RecipeCardProps = {
  id: string;
  title: string;
  imageUrl: string | null;
  sourceName: string | null;
};

export function RecipeCard({ id, title, imageUrl, sourceName }: RecipeCardProps) {
  return (
    <a
      href={`/recipes/${id}`}
      className="group overflow-hidden rounded-lg border border-stone-200 dark:border-stone-800"
    >
      <div className="relative aspect-square bg-stone-100 dark:bg-stone-900">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-400 dark:text-stone-600">
            <span className="font-gaegu text-lg">Geen foto</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-stone-800 dark:text-stone-200">
          {title}
        </h3>
        {sourceName && (
          <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-500">
            {sourceName}
          </p>
        )}
      </div>
    </a>
  );
}
