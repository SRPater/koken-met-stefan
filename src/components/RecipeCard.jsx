import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, image, title, sourceName }) => {
  return (
    <Link to={`recept/${id}`} className="block h-full">
      <div className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm hover:border-brand-cyan transition-all group cursor-pointer flex flex-col h-full">
        <div className="h-52 w-full overflow-hidden border-b-2 border-slate-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-5 flex flex-col gap-1">
          <h3 className="font-gaegu text-2xl font-black text-brand-berry leading-tight">
            {title}
          </h3>
          <p className="font-gaegu text-xl text-brand-cyan font-bold">
            {sourceName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
