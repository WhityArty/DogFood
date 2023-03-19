import s from './index.module.css'
import cn from 'classnames'
import { useContext } from 'react'

import { ReactComponent as FavIcon } from './img/fav.svg'
import { ReactComponent as ProfileIcon } from './img/profile.svg'
import { ReactComponent as ChartsIcon } from './img/charts.svg'
import { ReactComponent as LogIcon } from './img/log.svg'

import { Link, useLocation } from 'react-router-dom'
import { CardContext } from '../../context/cardContext'
import { UserContext } from '../../context/userContext'

function Header(props) {
  const { favorites } = useContext(CardContext)
  const location = useLocation()

  const { isAuthentificated, setActiveModal } = useContext(UserContext)

  console.log(isAuthentificated)
  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.wrapper}>
          {props.children}
          <div className={s.iconsMenu}>
            {isAuthentificated ? (
              <Link to={'/profile'} className={s.favoritesLink}>
                <ProfileIcon />
              </Link>
            ) : (
              <Link
                to={'/login'}
                className={s.favoritesLink}
                onClick={() => setActiveModal(true)}
                state={{
                  backgroundLocation: location,
                  initialPath: location.pathname,
                }}
              >
                {<LogIcon />}
              </Link>
            )}
            <Link to={'/visual'} className={s.favoritesLink}>
              <ChartsIcon />
            </Link>
            <Link className={s.favoritesLink} to={'/favorites'}>
              <FavIcon />
              {favorites.length !== 0 && (
                <span className={s.iconBubble}>{favorites.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
