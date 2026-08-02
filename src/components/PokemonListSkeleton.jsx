function PokemonListSkeleton() {
  return (
    <ul
      aria-label="Cargando Pokémon"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <li
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="relative mb-4 flex h-40 items-center justify-center rounded-xl bg-slate-100">
            <div className="absolute left-3 top-3 h-6 w-12 animate-pulse rounded-full bg-slate-200" />

            <div className="h-28 w-28 animate-pulse rounded-full bg-slate-200" />
          </div>

          <div className="mx-auto h-5 w-28 animate-pulse rounded bg-slate-200" />

          <div className="mx-auto mt-3 h-4 w-20 animate-pulse rounded bg-slate-200" />
        </li>
      ))}
    </ul>
  )
}

export default PokemonListSkeleton