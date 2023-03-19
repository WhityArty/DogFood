import s from './index.module.scss';
import cn from 'classnames';

function Button({type, children}) {
    
  return (
    <button className={ cn(s.button, {
        [s.primary]: type === 'primary',
        [s.secondary]: type === 'secondary',
    })}>
        {children}
    </button>
  )
}

export default Button;
