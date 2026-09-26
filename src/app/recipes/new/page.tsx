import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/get-session";
import { RecipeForm } from "./recipe-form";

export default async function NewRecipePage() {
  const session = await requireAuth();
  if (!session) redirect("/login");
  
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
