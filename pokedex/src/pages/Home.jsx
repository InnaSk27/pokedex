import { useState, useEffect } from 'react'
import PokemonCard from '../components/PokemonCard'
import Pagination from '../components/Pagination'
import styles from './Home.module.css'
import { useTheme } from '../contexts/ThemeContext'

const LIMIT = 20
const TOTAL = 151 // Gen 1 only — keeps the project focused
const TOTAL_PAGES = Math.ceil(TOTAL / LIMIT)

export default function Home({ favorites, addToFavorites }) {
  const [page, setPage] = useState(1)
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const {theme} = useTheme()


  useEffect(() => {
    setLoading(true)
    setError(false)

    const offset = (page - 1) * LIMIT

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch list')
        return res.json()
      })
      .then((data) => {
        // PokéAPI returns only name + url — we need to fetch each detail
        const detailRequests = data.results.map((p) =>
          fetch(p.url).then((r) => {
            if (!r.ok) throw new Error('Failed to fetch pokemon')
            return r.json()
          })
        )
        return Promise.all(detailRequests)
      })
      .then((details) => {
        setPokemonList(details)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [page])

  if (loading) {
    return <div className={styles.status}>Loading Pokémon...</div>
  }

  if (error) {
    return <div className={styles.status}>Failed to load data. Please try again.</div>
  }

  return (
    <main className={styles[theme]}>
      <h1 className={styles.title}>Pokédex <span>Gen I</span></h1>

      <div className={styles.grid}>
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onAddToFavorites={addToFavorites}
            isFavorite={favorites.some((fav) => fav.id === pokemon.id)}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={TOTAL_PAGES}
        onPageChange={setPage}
      />
    </main>
  )
}
