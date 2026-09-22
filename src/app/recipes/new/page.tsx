import { RecipeForm } from "./recipe-form";

export default function NewRecipePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-gaegu text-3xl text-stone-800 dark:text-stone-200">
        Nieuw Recept
      </h1>
      <div className="mt-6">
        <RecipeForm />
      </div>
    </div>
  );
}
