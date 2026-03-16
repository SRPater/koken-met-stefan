import React, { useState, useMemo } from 'react';
import { ChevronDown, Filter, Globe, SearchX } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../data/recipes';
import { useSearch } from '../context/useSearch';

const RecipeList = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedCuisine, setSelectedCuisine] = useState('Alle Keukens');
  const [selectedSource, setSelectedSource] = useState('Alle Bronnen');

  const cuisines = useMemo(() => {
    const allCuisines = recipes.flatMap((r) => r.cuisine);
    const uniqueCuisines = [...new Set(allCuisines)];

    return [
      'Alle Keukens',
      ...uniqueCuisines.sort((a, b) => a.localeCompare(b)),
    ];
  }, []);

  const sources = useMemo(() => {
    const allSources = recipes.map((r) => r.sourceName);
    const uniqueSources = [...new Set(allSources)];

    return [
      'Alle Bronnen',
      ...uniqueSources.sort((a, b) => a.localeCompare(b)),
    ];
  }, []);

  const filteredRecipes = useMemo(() => {
    const filtered = recipes.filter((recipe) => {
      const matchCuisine =
        selectedCuisine === 'Alle Keukens' ||
        recipe.cuisine.includes(selectedCuisine);

      const matchSource =
        selectedSource === 'Alle Bronnen' ||
        recipe.sourceName === selectedSource;

      const isSearchActive = searchQuery.length >= 3;
      const matchSearch =
        !isSearchActive ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchCuisine && matchSource && matchSearch;
    });

    return filtered.sort(
      (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded),
    );
  }, [selectedCuisine, selectedSource, searchQuery]);

  const displayRecipes = filteredRecipes.slice(0, visibleCount);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('Alle Keukens');
    setSelectedSource('Alle Bronnen');
    setVisibleCount(12);
  };

  return (
    <div className="mx-auto max-w-7xl pb-20">
      <div className="mb-12 flex flex-col gap-8 rounded-3xl border-2 border-slate-100 bg-white p-8 shadow-sm">
        <div className="text-left">
          <h1 className="font-delight text-brand-berry text-4xl font-black tracking-tight uppercase md:text-5xl">
            {searchQuery.length >= 3
              ? `Zoekresultaten voor "${searchQuery}"`
              : 'Ontdek Recepten'}
          </h1>
          <p className="font-gaegu text-2xl text-slate-500">
            {filteredRecipes.length} recepten gevonden
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="relative w-full md:w-72">
            <Filter
              className="text-brand-cyan absolute top-1/2 left-4 -translate-y-1/2"
              size={20}
            />
            <select
              value={selectedCuisine}
              onChange={(e) => {
                setSelectedCuisine(e.target.value);
                setVisibleCount(12);
              }}
              className="font-gaegu focus:border-brand-cyan w-full cursor-pointer appearance-none rounded-2xl border-2 border-slate-200 bg-slate-50 py-4 pr-10 pl-12 text-2xl text-slate-700 transition-colors focus:outline-none"
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
              size={20}
            />
          </div>

          <div className="relative w-full md:w-72">
            <Globe
              className="text-brand-cyan absolute top-1/2 left-4 -translate-y-1/2"
              size={20}
            />
            <select
              value={selectedSource}
              onChange={(e) => {
                setSelectedSource(e.target.value);
                setVisibleCount(12);
              }}
              className="font-gaegu focus:border-brand-cyan w-full cursor-pointer appearance-none rounded-2xl border-2 border-slate-200 bg-slate-50 py-4 pr-10 pl-12 text-2xl text-slate-700 transition-colors focus:outline-none"
            >
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
              size={20}
            />
          </div>
        </div>
      </div>

      {displayRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              sourceName={recipe.sourceName}
              image={recipe.image}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <SearchX className="text-slate-400" size={40} />
          </div>

          <p className="font-gaegu mb-8 text-3xl text-slate-500">
            Geen recepten gevonden voor deze selectie.
          </p>

          <button
            onClick={resetFilters}
            className="border-brand-cyan text-brand-cyan font-gaegu hover:bg-brand-cyan cursor-pointer rounded-2xl border-2 px-8 py-3 text-2xl font-bold transition-all hover:text-white active:scale-95"
          >
            Alle filters wissen
          </button>
        </div>
      )}

      {visibleCount < filteredRecipes.length && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="bg-brand-berry font-gaegu hover:bg-brand-berry/90 cursor-pointer rounded-2xl px-12 py-4 text-3xl font-bold text-white shadow-lg transition-all hover:-translate-y-1 active:scale-95"
          >
            Laad meer recepten
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
