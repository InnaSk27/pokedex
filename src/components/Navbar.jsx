import { NavLink } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import styles from './Navbar.module.css'

export default function Navbar({ favCount }) {

  const {theme} = useTheme()

  return (
    <nav className={styles[theme]}>
      <span className={styles.logo}>Pokédex</span>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'right',
        padding: '1rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <ThemeToggle />
      </div>
      <div className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Favorites
          {favCount > 0 && (
            <span className={styles.badge}>{favCount}</span>
          )}
        </NavLink>
      </div>
    </nav>
  )
}
