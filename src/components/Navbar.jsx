import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 w-full border-b border-slate-200 bg-white py-3 shadow-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="font-gaegu flex gap-8 text-2xl font-bold text-slate-600">
          <Link to="/" className="hover:text-brand-cyan transition-colors">
            Home
          </Link>
          <Link
            to="/recepten"
            className="hover:text-brand-cyan transition-colors"
          >
            Alle Recepten
          </Link>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Zoek een recept..."
            className="font-gaegu focus:border-brand-cyan focus:ring-brand-cyan/10 w-full rounded-full border-2 border-slate-300 bg-white py-2 pr-4 pl-10 text-lg transition-all placeholder:text-slate-400 focus:ring-4 focus:outline-none"
          />
          <Search
            className="absolute top-3 left-3.5 text-slate-500"
            size={20}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
