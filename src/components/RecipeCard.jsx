import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, image, title, sourceName }) => {
  return (
    <Link to={`/recept/${id}`} className="block h-full">
      <div className="hover:border-brand-cyan group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm transition-all">
        <div className="h-52 w-full overflow-hidden border-b-2 border-slate-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-1 p-5">
          <h3 className="font-gaegu text-brand-berry text-2xl leading-tight font-black">
            {title}
          </h3>
          <p className="font-gaegu text-brand-cyan text-xl font-bold">
            {sourceName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
