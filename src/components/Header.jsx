import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full border-b border-slate-100 bg-white py-6 shadow-sm">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="group flex flex-col items-center transition-opacity hover:opacity-90"
        >
          <div className="flex items-center gap-6">
            <ChefHat className="text-brand-cyan hidden sm:block" size={40} />

            <h1 className="font-delight text-brand-berry text-4xl font-black">
              Koken Met Stefan
            </h1>

            <ChefHat className="text-brand-cyan hidden sm:block" size={40} />
          </div>

          <p className="font-gaegu text-brand-cyan -mt-1 text-xl font-bold">
            Mijn persoonlijke kookboek
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
