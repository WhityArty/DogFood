import s from './index.module.css';
import cn from 'classnames';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';

import { ReactComponent as FavIcon } from './img/fav.svg';
import { Link } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { useEffect } from 'react';
import api from '../../utils/api';
import { isVisible } from '@testing-library/user-event/dist/utils';

function Header({ children, setActiveModal }) {
  const { favorites } = useContext(CardContext);

  const [state, setState] = useState('');
  const [isVisible, setVisible] = useState(false);

  const { toggleTheme } = useContext(ThemeContext);

  function checkMouse(e) {
    if (e.target.textContent === 'enter') {
      setVisible(true);
    }
  }
  // alert();
  // eslint-disable-next-line no-restricted-globals
  // confirm('Are you sure');

  return (
    <header className={cn(s.header, 'cover')}>
      <div className='container'>
        <div className={s.wrapper}>
          {children}
          <div>
            <Link
              to={'/login'}
              style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => setActiveModal(true)}
              onMouseEnter={(e) => checkMouse(e)}
              onMouseLeave={() => setVisible(false)}
            >
              enter
            </Link>
            {isVisible && <div style={{ position: 'absolute' }}>I AM HERE</div>}
          </div>

          <div className={s.iconsMenu}>
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
  );
}

export default Header;
