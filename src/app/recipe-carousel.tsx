"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RecipeCard } from "./recipes/recipe-card";

type Recipe = {
  id: string;
  title: string;
  imageUrl: string | null;
};

export function RecipeCarousel({ recipes }: { recipes: Recipe[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [arrowTop, setArrowTop] = useState<number | null>(null);

  useEffect(() => {
    function updateArrowPosition() {
      const card = firstCardRef.current;
      if (!card) return;
      const img = card.querySelector("img, div.aspect-square");
      if (img) {
        setArrowTop((img as HTMLElement).offsetHeight / 2);
      }
    }
    updateArrowPosition();
    window.addEventListener("resize", updateArrowPosition);
    return () => window.removeEventListener("resize", updateArrowPosition);
  }, []);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  if (recipes.length === 0) {
    return <p className="text-stone-500">Geen recepten gevonden.</p>
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id}
            ref={index === 0 ? firstCardRef : undefined}
            className="w-[calc(100%-0.75rem)] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <RecipeCard
              id={recipe.id}
              title={recipe.title}
              imageUrl={recipe.imageUrl}
              sourceName={null}
            />
          </div>
        ))}
      </div>

      {recipes.length > 3 && arrowTop !== null && (
        <>
          <button
            onClick={() => scroll("left")}
            aria-label="Vorige"
            style={{ top: arrowTop }}
            className="absolute left-1.5 -translate-y-1/2 rounded-full bg-white p-1.5 shadow dark:bg-stone-800"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Volgende"
            style={{ top: arrowTop }}
            className="absolute right-1.5 -translate-y-1/2 rounded-full bg-white p-1.5 shadow dark:bg-stone-800"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}
