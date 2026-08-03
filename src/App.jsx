import { Route, Routes } from 'react-router'
import { Toaster } from 'sonner'

import CollectionListPage from './features/collection/pages/CollectionListPage'
import CreatePostPage from './pages/CreatePostPage'
import PokemonDetailPage from './pages/PokemonDetailPage'
import PokemonListPage from './pages/PokemonListPage'
import CreateCollectionPage from './features/collection/pages/CreateCollectionPage'
import CollectionDetailPage from './features/collection/pages/CollectionDetailPage'
import EditCollectionPage from './features/collection/pages/EditCollectionPage'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<PokemonListPage />}
        />

        <Route
          path="/pokemon/:name"
          element={<PokemonDetailPage />}
        />

        <Route
          path="/posts/nuevo"
          element={<CreatePostPage />}
        />

        <Route
          path="/collection"
          element={<CollectionListPage />}
        />

        <Route
          path="/collection/new"
          element={<CreateCollectionPage />}  
        />

        <Route
          path="/collection/:id/edit"
          element={<EditCollectionPage />}
        />

        <Route
          path="/collection/:id"
          element={<CollectionDetailPage />}
        />
      </Routes>

      <Toaster
        richColors
        position="top-right"
      />
    </>
  )
}

export default App