import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Users } from 'lucide-react';
import { recipes } from '../data/recipes';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe)
    return (
      <div className="font-gaegu p-20 text-center text-2xl">
        Recept niet gevonden.
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl pb-20">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-brand-cyan font-gaegu mb-4 flex cursor-pointer items-center gap-1 text-lg font-bold text-slate-400 transition-colors"
        >
          <ChevronLeft size={18} /> Terug
        </button>

        <h1 className="font-delight text-brand-berry mb-2 text-5xl font-black tracking-tight uppercase md:text-6xl">
          {recipe.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex gap-2">
            {recipe.cuisine.map((c, i) => (
              <span
                key={i}
                className="bg-brand-cyan/10 text-brand-cyan font-gaegu rounded-full px-3 py-0.5 text-lg font-bold"
              >
                {c}
              </span>
            ))}
          </div>
          <span className="hidden text-slate-300 md:block">|</span>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-cyan font-gaegu flex items-center gap-1.5 text-xl text-slate-500 transition-colors"
          >
            Bron: {recipe.sourceName} <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className="mb-12 h-100 w-full overflow-hidden rounded-3xl border-2 border-slate-100 shadow-sm md:h-125">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <aside className="rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-sm lg:sticky lg:top-24 lg:col-span-4">
          <h2 className="font-gaegu text-brand-berry mb-6 flex items-center gap-2 text-3xl font-black">
            Ingredienten
          </h2>
          <ul className="space-y-4">
            {recipe.ingredients.map((ing, i) => (
              <li
                key={i}
                className="font-gaegu flex items-start justify-between gap-4 border-b border-slate-50 pb-2 text-xl text-slate-700"
              >
                <span className="flex-1">{ing.name}</span>
                <span className="text-brand-cyan font-bold whitespace-nowrap">
                  {ing.amount > 0 && ing.amount} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="lg:col-span-8">
          <div className="bg-brand-berry/5 mb-8 flex w-fit items-center gap-3 rounded-2xl p-4">
            <Users className="text-brand-berry" size={24} />
            <span className="font-gaegu text-brand-berry text-2xl font-bold">
              Voor {recipe.servings} personen
            </span>
          </div>

          <h2 className="font-gaegu text-brand-berry mb-8 text-4xl font-black">
            Bereidingswijze
          </h2>

          <div className="space-y-10">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="group flex gap-6">
                <span className="border-brand-cyan text-brand-cyan font-delight group-hover:bg-brand-cyan flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 bg-white text-2xl font-black shadow-sm transition-colors group-hover:text-white">
                  {i + 1}
                </span>
                <p className="loading-relaxed pt-1 text-xl text-slate-700">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecipeDetail;
