import { Routes, Route } from 'react-router'
import PokemonListPage from './pages/PokemonListPage'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<PokemonListPage />}
      />
    </Routes>
  )
}

export default App