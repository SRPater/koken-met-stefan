import React from 'react';
import { ChefHat } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-slate-100 py-6 shadow-sm">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center gap-6">
          <ChefHat className="text-brand-cyan hidden sm:block" size={40} />

          <h1 className="font-delight text-4xl font-black text-brand-berry">
            Koken Met Stefan
          </h1>

          <ChefHat className="text-brand-cyan hidden sm:block" size={40} />
        </div>

        <p className="font-gaegu text-xl font-bold text-brand-cyan -mt-1">
          Mijn persoonlijke kookboek
        </p>
      </div>
    </header>
  );
};

export default Header;
