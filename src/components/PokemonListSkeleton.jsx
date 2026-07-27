const skeletonItems = Array.from({ length: 20 })

function PokemonListSkeleton() {
  return (
    <div role="status">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skeletonItems.map((_, index) => (
          <li
            key={index}
            className="animate-pulse rounded-xl bg-white p-5 shadow"
          >
            <div className="mx-auto h-24 w-24 rounded-full bg-slate-200" />

            <div className="mx-auto mt-4 h-5 w-28 rounded bg-slate-200" />
          </li>
        ))}
      </ul>

      <span className="sr-only">
        Cargando Pokémon...
      </span>
    </div>
  )
}

export default PokemonListSkeleton