"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRecipe } from "./actions";
import { UNIT_OPTIONS } from "@/lib/units";

type IngredientRow = {
  name: string;
  quantity: string;
  unit: string;
  note: string;
};

export function RecipeForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [baseServings, setBaseServings] = useState(4);
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [steps, setSteps] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    { name: "", quantity: "", unit: "", note: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);

  function updateStep(index: number, value: string) {
    setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));
  }

  function addStep() {
    setSteps((prev) => [...prev, ""]);
  }

  function removeStep(index: number) {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }

  function updateIngredient(
    index: number,
    field: keyof IngredientRow,
    value: string,
  ) {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
    );
  }

  function addIngredient() {
    setIngredients((prev) => [
      ...prev,
      { name: "", quantity: "", unit: "", note: "" },
    ]);
  }

  function removeIngredient(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createRecipe({
        title,
        baseServings,
        sourceName: sourceName || undefined,
        sourceUrl: sourceUrl || undefined,
        steps: steps.filter((s) => s.trim() !== ""),
        ingredients: ingredients
          .filter((ing) => ing.name.trim() !== "")
          .map((ing, index) => ({
            name: ing.name.trim(),
            quantity: ing.quantity ? Number(ing.quantity) : null,
            unit: ing.unit || null,
            note: ing.note || undefined,
            position: index,
          })),
      });
      router.push("/recipes");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-stone-700 dark:text-stone-300"
        >
          Titel
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded border border-stone-300 px-3 py-2 dark:border-stone-700 dark:bg-stone-900"
        />
      </div>

      <div>
        <label
          htmlFor="baseServings"
          className="block text-sm font-medium text-stone-700 dark:text-stone-300"
        >
          Aantal porties (basis)
        </label>
        <input
          id="baseServings"
          name="baseServings"
          type="number"
          min={1}
          value={baseServings}
          onChange={(e) => setBaseServings(Number(e.target.value))}
          className="mt-1 w-32 rounded border border-stone-300 px-3 py-2 dark:border-stone-700 dark:bg-stone-900"
        />
      </div>

      <fieldset className="grid grid-cols-2 gap-4">
        <legend className="col-span-2 text-sm font-medium text-stone-700 dark:text-stone-300">
          Bron
        </legend>
        <div>
          <label
            htmlFor="sourceName"
            className="block text-sm text-stone-600 dark:text-stone-400"
          >
            Naam
          </label>
          <input
            id="sourceName"
            type="text"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            placeholder="bijv. Ottolenghi, Simple"
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 dark:border-stone-700 dark:bg-stone-900"
          />
        </div>
        <div>
          <label
            htmlFor="sourceUrl"
            className="block text-sm text-stone-600 dark:text-stone-400"
          >
            URL
          </label>
          <input
            id="sourceUrl"
            name="sourceUrl"
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://..."
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 dark:border-stone-700 dark:bg-stone-900"
          />
        </div>
      </fieldset>

      <div>
        <h2 className="font-gaegu text-xl text-stone-800 dark:text-stone-200">
          Ingredienten
        </h2>
        <div className="mt-2 flex flex-col gap-2">
          {ingredients.map((ing, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                aria-label={`Hoeveelheid voor ingrediënt ${index + 1}`}
                placeholder="hoeveelheid"
                value={ing.quantity}
                onChange={(e) =>
                  updateIngredient(index, "quantity", e.target.value)
                }
                className="w-24 rounded border border-stone-300 px-2 py-1 dark:border-stone-700 dark:bg-stone-900"
              />
              <select
                aria-label={`Eenheid voor ingrediënt ${index + 1}`}
                value={ing.unit}
                onChange={(e) =>
                  updateIngredient(index, "unit", e.target.value)
                }
                className="w-28 rounded border border-stone-300 px-2 py-1 dark:border-stone-700 dark:bg-stone-900"
              >
                {UNIT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                aria-label={`Naam van ingrediënt ${index + 1}`}
                placeholder="ingrediënt"
                value={ing.name}
                onChange={(e) =>
                  updateIngredient(index, "name", e.target.value)
                }
                className="flex-1 rounded border border-stone-300 px-2 py-1 dark:border-stone-700 dark:bg-stone-900"
              />
              <input
                type="text"
                aria-label={`Optionele notitie voor ingrediënt ${index + 1}`}
                placeholder="notitie (optioneel)"
                value={ing.note}
                onChange={(e) =>
                  updateIngredient(index, "note", e.target.value)
                }
                className="flex-1 rounded border border-stone-300 px-2 py-1 dark:border-stone-700 dark:bg-stone-900"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="px-2 text-stone-400 hover:text-crimson"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 text-sm text-crimson hover:underline dark:text-cyan"
          >
            + Ingrediënt toevoegen
          </button>
        </div>

        <div>
          <h2 className="font-gaegu text-xl text-stone-800 dark:text-stone-200">
            Bereiding
          </h2>
          <div className="mt-2 flex flex-col gap-2">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-2">
                <span className="mt-2 text-sm text-stone-400">{index + 1}.</span>
                <textarea
                  aria-label={`Stap ${index + 1} van de bereiding`}
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  rows={2}
                  className="flex-1 rounded border border-stone-300 px-2 py-1 dark:border-stone-700 dark:bg-stone-900"
                />
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="px-2 text-stone-400 hover:text-crimson"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addStep}
            className="mt-2 text-sm text-crimson hover:underline dark:text-cyan"
          >
            + Stap toevoegen
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="self-start rounded bg-crimson px-6 py-2 text-white disabled:opacity-50 dark:bg-cyan dark:text-stone-950"
        >
          {submitting ? "Opslaan..." : "Recept opslaan"}
        </button>
      </form>
  );
}
