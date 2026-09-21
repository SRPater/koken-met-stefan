export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="font-gaegu text-2xl text-stone-800 dark:text-stone-200">
          Nieuwste recepten
        </h2>
        <p className="mt-2 text-stone-500">Geen recepten gevonden.</p>
      </section>

      <section>
        <h2 className="font-gaegu text-2xl text-stone-800 dark:text-stone-200">
          Willekeurige recepten
        </h2>
        <p className="mt-2 text-stone-500">Geen recepten gevonden.</p>
      </section>
    </div>
  );
}
