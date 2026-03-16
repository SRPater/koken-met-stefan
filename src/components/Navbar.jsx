import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useSearch } from '../context/useSearch';

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value && location.pathname !== '/recepten') {
      navigate('/recepten');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

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
            value={searchQuery}
            onChange={handleSearch}
            className="font-gaegu focus:border-brand-cyan focus:ring-brand-cyan/10 w-full rounded-full border-2 border-slate-300 bg-white py-2 pr-4 pl-10 text-lg transition-all placeholder:text-slate-400 focus:ring-4 focus:outline-none"
          />

          <Search
            className="absolute top-3 left-3.5 text-slate-500"
            size={20}
          />

          {searchQuery && (
            <button
              onClick={clearSearch}
              className="hover:text-brand-berry absolute top-2.5 right-3 cursor-pointer rounded-full p-0.5 text-slate-400 transition-colors hover:bg-slate-100"
              aria-label="Wis zoekopdracht"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
