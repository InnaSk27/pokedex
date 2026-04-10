import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import Favorites from './pages/Favorites'

export default function App() {
  const [favorites, setFavorites] = useState([])

  const addToFavorites = (pokemon) => {
    if (!favorites.find((fav) => fav.id === pokemon.id)) {
      setFavorites([...favorites, pokemon])
    }
  }

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
  }

  return (
    <>
      <Navbar favCount={favorites.length} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              addToFavorites={addToFavorites}
            />
          }
        />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
      </Routes>
    </>
  )
}
 