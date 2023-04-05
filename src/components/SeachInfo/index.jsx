import { useLocation } from 'react-router-dom';
import './index.css';

const SeachInfo = ({ searchText, searchCount }) => {
  const location = useLocation();
  return (
    location.pathname === '/' &&
    searchText && (
      <section className='search-title'>
        По запросу <span>{searchText}</span> найдено {searchCount} товаров
      </section>
    )
  );
};

export default SeachInfo;
