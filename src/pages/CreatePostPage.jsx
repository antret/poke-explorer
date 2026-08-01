import { Link } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createPost } from '../api/postApi'
import { postSchema } from '../schemas/postSchema'

function CreatePostPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  })

  const {
    mutate,
    isPending,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success('Publicación creada correctamente')
      reset()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (formData) => {
    mutate(formData)
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="mb-6 inline-block font-semibold text-red-600 hover:underline"
        >
          ← Volver al listado
        </Link>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-red-600">
              Crear publicación
            </h1>

            <p className="mt-2 text-slate-600">
              Completa los campos para registrar una publicación.
            </p>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-semibold text-slate-800"
              >
                Título
              </label>

              <input
                id="title"
                type="text"
                {...register('title')}
                aria-invalid={Boolean(errors.title)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-red-500"
              />

              {errors.title && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="body"
                className="mb-2 block font-semibold text-slate-800"
              >
                Contenido
              </label>

              <textarea
                id="body"
                rows="6"
                {...register('body')}
                aria-invalid={Boolean(errors.body)}
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-red-500"
              />

              {errors.body && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.body.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isPending
                ? 'Creando publicación...'
                : 'Crear publicación'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default CreatePostPage