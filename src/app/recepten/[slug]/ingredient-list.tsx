"use client";

import { useState } from "react";
import { formatQuantity } from "@/lib/format-quantity";
import { formatUnitLabel } from "@/lib/units";

type Ingredient = {
  id: string;
  name: string;
  quantity: number | null;
  quantityMax: number | null;
  unit: string | null;
  customUnit: string | null;
  note: string | null;
};

const SCALES = [0.5, 1, 2, 4];

export function IngredientList({
  baseServings,
  ingredients,
}: {
  baseServings: number;
  ingredients: Ingredient[];
}) {
  const [scale, setScale] = useState(1);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-gaegu text-2xl text-stone-800 dark:text-stone-200">
          Ingredienten
        </h2>
        <div className="flex items-center gap-1 rounded-full border border-stone-300 p-1 dark:border-stone-700">
          {SCALES.map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                scale === s
                  ? "bg-crimson text-white dark:bg-cyan dark:text-stone-950"
                  : "text-stone-600 dark:text-stone-400"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <p className="mt-1 text-sm text-stone-500">
        Voor {baseServings * scale} personen
      </p>

      <ul className="mt-3 flex flex-col gap-2">
        {ingredients.map((ing) => {
          const amount = formatQuantity(ing.quantity, ing.quantityMax, scale);
          const unitLabel = ing.customUnit
            ? ing.customUnit
            : formatUnitLabel(ing.unit, (ing.quantity ?? 1) * scale);
          
          const leading = [amount, unitLabel].filter(Boolean).join(" ");
          
          return (
            <li
              key={ing.id}
              className="grid grid-cols-[7rem_1fr] gap-2 text-stone-700 dark:text-stone-300"
            >
              <span className="whitespace-nowrap text-stone-500 dark:text-stone-500">
                {leading}
              </span>
              <span>
                {ing.name}
                {ing.note && (
                  <span className="text-stone-500"> ({ing.note})</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
