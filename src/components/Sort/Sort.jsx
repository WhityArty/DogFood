import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import './index.css';

const Sort = () => {
  const { onSortData } = useContext(CardContext);
  const tabs = [
    { id: 'newest', title: 'Новинки' },
    { id: 'cheep', title: 'Сначала дешевые' },
    { id: 'expensive', title: 'Сначала дорогие' },
    { id: 'popular', title: 'По популярности' },
  ];

  const handleChange = (e,id) => {
    e.preventDefault();
    // setCurrentSort(id);
    onSortData(id);
  };
  return (
    <div className='sort'>
      {tabs.map((tab) => (
        <div key={tab.id}>
          <a className='sort__link' onClick={(e) => handleChange(e, tab.id)}>
            {tab.title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Sort;
