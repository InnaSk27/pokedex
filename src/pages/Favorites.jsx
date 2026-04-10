import { Link } from 'react-router-dom'
import styles from './Favorites.module.css'

const TYPE_COLORS = {
  fire: '#f08030', water: '#6890f0', grass: '#78c850', electric: '#f8d030',
  ice: '#98d8d8', fighting: '#c03028', poison: '#a040a0', ground: '#e0c068',
  flying: '#a890f0', psychic: '#f85888', bug: '#a8b820', rock: '#b8a038',
  ghost: '#705898', dragon: '#7038f8', dark: '#705848', steel: '#b8b8d0',
  fairy: '#ee99ac', normal: '#a8a878',
}

export default function Favorites({ favorites, removeFromFavorites }) {
  if (favorites.length === 0) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Favorites</h1>
        <div className={styles.empty}>
          <p>No favorites yet.</p>
          <Link to="/" className={styles.link}>Go catch some Pokémon →</Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Favorites <span className={styles.count}>{favorites.length}</span>
      </h1>

      <div className={styles.grid}>
        {favorites.map((pokemon) => {
          const sprite =
            pokemon.sprites?.other?.['official-artwork']?.front_default ||
            pokemon.sprites?.front_default

          return (
            <div key={pokemon.id} className={styles.card}>
              <Link to={`/pokemon/${pokemon.id}`}>
                <img src={sprite} alt={pokemon.name} className={styles.sprite} />
              </Link>

              <div className={styles.body}>
                <span className={styles.number}>#{String(pokemon.id).padStart(3, '0')}</span>
                <Link to={`/pokemon/${pokemon.id}`}>
                  <h3 className={styles.name}>{pokemon.name}</h3>
                </Link>

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

                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromFavorites(pokemon.id)}
                >
                  ✕ Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
