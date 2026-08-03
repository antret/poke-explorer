import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { usePokemonOptions } from '../hooks/usePokemonOptions'
import { collectionSchema } from '../schemas/collectionSchema'

const EMPTY_VALUES = {
  pokemonId: '',
  pokemonName: '',
  nickname: '',
  role: '',
  notes: '',
}

function CollectionForm({
  initialValues = EMPTY_VALUES,
  onSubmit,
  submitLabel,
  isSubmitting = false,
}) {
  const {
    data: pokemonOptions = [],
    isPending: isPokemonOptionsPending,
    isError: isPokemonOptionsError,
    error: pokemonOptionsError,
  } = usePokemonOptions()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      ...EMPTY_VALUES,
      ...initialValues,
    },
  })

  useEffect(() => {
    reset({
      ...EMPTY_VALUES,
      ...initialValues,
    })
  }, [initialValues, reset])

  const pokemonIdField = register('pokemonId')

  function handlePokemonChange(event) {
    pokemonIdField.onChange(event)

    const selectedPokemon = pokemonOptions.find(
      (pokemon) => String(pokemon.id) === event.target.value,
    )

    setValue(
      'pokemonName',
      selectedPokemon?.name ?? '',
      {
        shouldValidate: true,
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <input
        type="hidden"
        {...register('pokemonName')}
      />

      <div>
        <label
          htmlFor="pokemonId"
          className="mb-2 block font-semibold text-slate-800"
        >
          Pokémon
        </label>

        <select
          id="pokemonId"
          {...pokemonIdField}
          onChange={handlePokemonChange}
          disabled={
            isPokemonOptionsPending ||
            isPokemonOptionsError ||
            isSubmitting
          }
          aria-invalid={Boolean(errors.pokemonId)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          <option value="">
            {isPokemonOptionsPending
              ? 'Cargando Pokémon...'
              : 'Selecciona un Pokémon'}
          </option>

          {pokemonOptions.map((pokemon) => (
            <option
              key={pokemon.id}
              value={pokemon.id}
            >
              #{String(pokemon.id).padStart(3, '0')} —{' '}
              {pokemon.name}
            </option>
          ))}
        </select>

        {errors.pokemonId && (
          <p className="mt-2 text-sm text-red-600">
            {errors.pokemonId.message}
          </p>
        )}

        {isPokemonOptionsError && (
          <p className="mt-2 text-sm text-red-600">
            {pokemonOptionsError.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="nickname"
          className="mb-2 block font-semibold text-slate-800"
        >
          Apodo
        </label>

        <input
          id="nickname"
          type="text"
          placeholder="Ejemplo: Sparky"
          {...register('nickname')}
          aria-invalid={Boolean(errors.nickname)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

        {errors.nickname && (
          <p className="mt-2 text-sm text-red-600">
            {errors.nickname.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="role"
          className="mb-2 block font-semibold text-slate-800"
        >
          Rol dentro del equipo
        </label>

        <select
          id="role"
          {...register('role')}
          aria-invalid={Boolean(errors.role)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
        >
          <option value="">Selecciona un rol</option>
          <option value="Atacante">Atacante</option>
          <option value="Defensor">Defensor</option>
          <option value="Soporte">Soporte</option>
          <option value="Velocista">Velocista</option>
          <option value="Equilibrado">Equilibrado</option>
        </select>

        {errors.role && (
          <p className="mt-2 text-sm text-red-600">
            {errors.role.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="notes"
          className="mb-2 block font-semibold text-slate-800"
        >
          Notas
        </label>

        <textarea
          id="notes"
          rows="5"
          placeholder="Describe la función o características de este Pokémon."
          {...register('notes')}
          aria-invalid={Boolean(errors.notes)}
          className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

        {errors.notes && (
          <p className="mt-2 text-sm text-red-600">
            {errors.notes.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={
          isSubmitting ||
          isPokemonOptionsPending ||
          isPokemonOptionsError
        }
        className="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isSubmitting ? 'Guardando...' : submitLabel}
      </button>
    </form>
  )
}

export default CollectionForm