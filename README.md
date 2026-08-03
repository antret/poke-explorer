# PokéExplorer

PokéExplorer es una aplicación web desarrollada con React que permite explorar Pokémon utilizando PokeAPI y administrar una colección personalizada mediante un CRUD completo conectado a MockAPI.

El proyecto fue construido progresivamente en tres niveles, incorporando listado de datos, navegación, formularios, validaciones, arquitectura modular y consumo de múltiples APIs.

## Funcionalidades

### Explorador de Pokémon

- Listado de Pokémon obtenido desde PokeAPI.
- Imágenes oficiales de cada Pokémon.
- Búsqueda por nombre.
- Paginación.
- Vista de detalle.
- Diseño responsive.
- Skeletons durante la carga.
- Manejo visual de errores.

### Formulario de publicaciones

- Creación de publicaciones mediante JSONPlaceholder.
- Validación de formularios con Zod.
- Gestión del formulario con React Hook Form.
- Notificaciones de éxito y error con Sonner.

### Colección Pokémon

La colección implementa un CRUD completo:

- Crear un Pokémon en la colección.
- Listar los Pokémon registrados.
- Consultar el detalle de un registro.
- Actualizar un registro.
- Eliminar un registro.

Cada registro contiene:

- Pokémon seleccionado.
- Apodo.
- Rol dentro del equipo.
- Notas del entrenador.

## Integración de APIs

La aplicación utiliza tres fuentes de datos:

### PokeAPI

Se utiliza para obtener:

- Listado de Pokémon.
- Imágenes.
- Altura y peso.
- Tipos.
- Habilidades.
- Información detallada.

### JSONPlaceholder

Se utiliza para simular la creación de publicaciones mediante una petición HTTP POST.

### MockAPI

Se utiliza como backend simulado para almacenar los registros de la colección Pokémon y ejecutar las operaciones del CRUD.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router
- TanStack React Query
- React Hook Form
- Zod
- Axios
- Sonner
- Tailwind CSS
- ESLint
- Git y GitHub

## Arquitectura del proyecto

La funcionalidad de la colección se encuentra organizada por característica:

```text
src/
├── api/
│   ├── pokemonApi.js
│   └── postApi.js
├── components/
│   ├── PageState.jsx
│   └── PokemonListSkeleton.jsx
├── features/
│   └── collection/
│       ├── api/
│       │   └── collectionApi.js
│       ├── components/
│       │   └── CollectionForm.jsx
│       ├── hooks/
│       │   ├── useCollectionItem.js
│       │   ├── useCollectionItems.js
│       │   ├── useCreateCollectionItem.js
│       │   ├── useDeleteCollectionItem.js
│       │   ├── usePokemonOptions.js
│       │   └── useUpdateCollectionItem.js
│       ├── pages/
│       │   ├── CollectionDetailPage.jsx
│       │   ├── CollectionListPage.jsx
│       │   ├── CreateCollectionPage.jsx
│       │   └── EditCollectionPage.jsx
│       ├── schemas/
│       │   └── collectionSchema.js
│       └── utils/
│           └── getRequestErrorMessage.js
├── lib/
│   └── apiClient.js
├── pages/
│   ├── CreatePostPage.jsx
│   ├── PokemonDetailPage.jsx
│   └── PokemonListPage.jsx
├── styles/
│   └── tailwind.css
├── App.jsx
└── main.jsx