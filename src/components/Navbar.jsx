import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-slate-200 py-3 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-8 font-gaegu text-2xl font-bold text-slate-600">
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
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-slate-300 bg-white font-gaegu text-lg transition-all placeholder:text-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/10"
          />
          <Search
            className="absolute left-3.5 top-3 text-slate-500"
            size={20}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
