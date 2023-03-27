import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import logoSrc from './logo.svg';

function Logo({ className, href, ...props }) {
  const navigate = useNavigate();
  return (
    <div
      className={className ? className : 'logo'}
      {...props}
      onClick={() => navigate('/')}
    >
      <img src={logoSrc} alt='Логотип компании' className='logo__pic' />
    </div>
  );
}

export default Logo;
