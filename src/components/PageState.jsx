import { Link } from 'react-router'

export function LoadingState({
  message = 'Cargando información...',
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="text-center">
        <div
          aria-hidden="true"
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-red-600"
        />

        <p className="mt-4 text-lg font-medium text-slate-600">
          {message}
        </p>
      </div>
    </main>
  )
}

export function ErrorState({
  message = 'Ocurrió un error inesperado.',
  backTo = '/',
  backLabel = 'Volver al inicio',
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-100 px-4">
      <div className="max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center shadow-md">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Ocurrió un problema
        </p>

        <p className="mt-3 text-lg font-medium text-slate-700">
          {message}
        </p>

        <Link
          to={backTo}
          className="mt-5 inline-block rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white transition hover:bg-slate-700"
        >
          {backLabel}
        </Link>
      </div>
    </main>
  )
}