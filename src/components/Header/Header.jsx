import s from './index.module.css';
import cn from 'classnames';

function Header({ children, user, onUpdateUser }) {
  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    onUpdateUser({ about: 'Писатель', name: "Арсений" });
  };
  

  return (
    <header className={cn(s.header, 'cover')}>
      <div className='container'>
        {/* {user && person && <span>{user.person.email} </span>}
       {user && <span>{user.name}</span>} */}

        <span>{user?.about} </span>
        <span>{user?.email} </span>
        {/* <button className='btn' onClick={()=> onUpdateUser({ about: 'Писатель' })}> */}
        <button className='btn' onClick={handleClickButtonEdit}>
          Change
        </button>

        <div className={s.wrapper}>{children}</div>
      </div>
    </header>
  );
}

export default Header;
