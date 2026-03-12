import React from 'react';
import { ChefHat } from 'lucide-react';

const App = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white p-12 shadow-2xl shadow-brand-cyan/10 border border-brand-cyan/20">
        <div className="rounded-full bg-brand-cyan/10 p-4">
          <ChefHat className="text-brand-cyan" size={64} />
        </div>

        <div className="text-center">
          <h1 className="font-delight text-7xl font-black text-brand-berry">
            Koken Met Stefan
          </h1>
          <h2 className="font-gaegu text-3xl font-bold text-brand-cyan mt-2">
            Mijn Persoonlijke Recepten
          </h2>
        </div>

        <p className="max-w-xs text-center text-slate-500 text-sm leading-relaxed">
          Alle favoriete recepten van verschillende bronnen, overzichtelijk op één plek.
        </p>
      </div>
    </div>
  );
};

export default App;
