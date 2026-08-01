import { Routes, Route } from 'react-router'
import { Toaster } from 'sonner'

import PokemonListPage from './pages/PokemonListPage'
import PokemonDetailPage from './pages/PokemonDetailPage'
import CreatePostPage from './pages/CreatePostPage'

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
      </Routes>

      <Toaster richColors position="top-right" />
    </>
  )
}

export default App