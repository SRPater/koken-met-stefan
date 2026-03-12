import React from 'react';
import { Clock, Sparkles } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../data/recipes';

const sortedRecipes = [...recipes].sort(
  (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
);

const shuffledRecipes = [...recipes].sort(() => 0.5 - Math.random());

const Home = () => {
  const lastAdded = sortedRecipes.slice(0, 3);
  const randomRecipes = shuffledRecipes.slice(0, 3);

  return (
    <div className="space-y-16">
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Clock className="text-brand-berry" size={28} />
          <h2 className="font-gaegu text-4xl font-black text-brand-berry">
            Laatst Toegevoegd
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lastAdded.map((recipe) => (
            <RecipeCard
              key={`latest-${recipe.id}`}
              title={recipe.title}
              sourceName={recipe.sourceName}
              image={recipe.image}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="text-brand-cyan" size={28} />
          <h2 className="font-gaegu text-4xl font-black text-brand-cyan">
            Willekeurige Recepten
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {randomRecipes.map((recipe) => (
            <RecipeCard
              key={`random-${recipe.id}`}
              title={recipe.title}
              sourceName={recipe.sourceName}
              image={recipe.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
