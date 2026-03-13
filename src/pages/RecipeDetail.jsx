import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Users } from 'lucide-react';
import { recipes } from '../data/recipes';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) return (
    <div className="p-20 text-center font-gaegu text-2xl">
      Recept niet gevonden.
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-slate-400 hover:text-brand-cyan mb-4 font-gaegu text-lg font-bold transition-colors cursor-pointer"
        >
          <ChevronLeft size={18} /> Terug
        </button>

        <h1 className="font-delight text-5xl md:text-6xl font-black text-brand-berry mb-2 uppercase tracking-tight">
          {recipe.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex gap-2">
            {recipe.cuisine.map((c, i) => (
              <span
                key={i}
                className="bg-brand-cyan/10 text-brand-cyan px-3 py-0.5 rounded-full font-gaegu text-lg font-bold"
              >
                {c}
              </span>
            ))}
          </div>
          <span className="text-slate-300 hidden md:block">|</span>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-500 hover:text-brand-cyan font-gaegu text-xl transition-colors"
          >
            Bron: {recipe.sourceName} <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className="w-full h-100 md:h-125 rounded-3xl overflow-hidden border-2 border-slate-100 mb-12 shadow-sm">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <aside className="lg:col-span-4 lg:sticky lg:top-24 bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm">
          <h2 className="font-gaegu text-3xl font-black text-brand-berry mb-6 flex items-center gap-2">
            Ingredienten
          </h2>
          <ul className="space-y-4">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="font-gaegu text-xl text-slate-700 flex justify-between items-start border-b border-slate-50 pb-2 gap-4">
                <span className="flex-1">{ing.name}</span>
                <span className="font-bold text-brand-cyan whitespace-nowrap">
                  {ing.amount > 0 && ing.amount} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-8 bg-brand-berry/5 p-4 rounded-2xl w-fit">
            <Users className="text-brand-berry" size={24} />
            <span className="font-gaegu text-2xl font-bold text-brand-berry">
              Voor {recipe.servings} personen
            </span>
          </div>

          <h2 className="font-gaegu text-4xl font-black text-brand-berry mb-8">
            Bereidingswijze
          </h2>

          <div className="space-y-10">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="shrink-0 w-12 h-12 rounded-2xl bg-white border-2 border-brand-cyan text-brand-cyan flex items-center justify-center font-delight text-2xl font-black shadow-sm group-hover:bg-brand-cyan group-hover:text-white transition-colors">
                  {i + 1}
                </span>
                <p className="text-xl text-slate-700 loading-relaxed pt-1">
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
