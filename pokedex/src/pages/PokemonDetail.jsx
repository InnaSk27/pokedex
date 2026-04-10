import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext.jsx'
import styles from './PokemonDetail.module.css'

const TYPE_COLORS = {
  fire: '#f08030', water: '#6890f0', grass: '#78c850', electric: '#f8d030',
  ice: '#98d8d8', fighting: '#c03028', poison: '#a040a0', ground: '#e0c068',
  flying: '#a890f0', psychic: '#f85888', bug: '#a8b820', rock: '#b8a038',
  ghost: '#705898', dragon: '#7038f8', dark: '#705848', steel: '#b8b8d0',
  fairy: '#ee99ac', normal: '#a8a878',
}

const STAT_LABELS = {
  hp: 'HP', attack: 'Attack', defense: 'Defense',
  'special-attack': 'Sp. Atk', 'special-defense': 'Sp. Def', speed: 'Speed',
}

export default function PokemonDetail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const {theme} = useTheme()

  useEffect(() => {
    setLoading(true)
    setError(false)

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => {
        setPokemon(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className={styles.status}>Loading...</div>
  if (error) return <div className={styles.status}>Failed to load Pokémon.</div>

  const sprite =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default

  return (
    <main className={styles[theme]}>
      <Link to="/" className={styles.back}>← Back to list</Link>

      <div className={styles.card}>
        <div className={styles.left}>
          <img src={sprite} alt={pokemon.name} className={styles.sprite} />
          <span className={styles.number}>#{String(pokemon.id).padStart(3, '0')}</span>
          <h1 className={styles.name}>{pokemon.name}</h1>
          <div className={styles.types}>
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className={styles.type}
                style={{ background: TYPE_COLORS[t.type.name] || '#888' }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <section className={styles.section}>
            <h2>Info</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Height</span>
                <span>{(pokemon.height / 10).toFixed(1)} m</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Weight</span>
                <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Base XP</span>
                <span>{pokemon.base_experience}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Abilities</span>
                <span>
                  {pokemon.abilities
                    .filter((a) => !a.is_hidden)
                    .map((a) => a.ability.name)
                    .join(', ')}
                </span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Base Stats</h2>
            {pokemon.stats.map((s) => (
              <div key={s.stat.name} className={styles.statRow}>
                <span className={styles.statLabel}>
                  {STAT_LABELS[s.stat.name] || s.stat.name}
                </span>
                <span className={styles.statValue}>{s.base_stat}</span>
                <div className={styles.barBg}>
                  <div
                    className={styles.bar}
                    style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h2>Moves <span className={styles.muted}>(first 10)</span></h2>
            <div className={styles.moves}>
              {pokemon.moves.slice(0, 10).map((m) => (
                <span key={m.move.name} className={styles.move}>{m.move.name}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
