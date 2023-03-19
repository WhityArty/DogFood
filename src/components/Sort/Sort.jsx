import { useContext, useState } from 'react';
import { CardContext } from '../../context/cardContext';
import './index.scss';

const Sort = () => {
  const { onSortData } = useContext(CardContext);
  const [sortedId, setSortedId] = useState('newest');

  const tabs = [
    { id: 'newest', title: 'Новинки' },
    { id: 'cheep', title: 'Сначала дешевые' },
    { id: 'expensive', title: 'Сначала дорогие' },
    { id: 'popular', title: 'По популярности' },
  ];

  const handleChange = (e, id) => {
    e.preventDefault();
    onSortData(id);
    setSortedId(id);
  };

  return (
    <div className='sort'>
      {tabs.map((tab) => (
        <div key={tab.id}>
          <span
            className={`sort__link ${tab.id === sortedId ? 'sort__link_selected' : ''} `}
            onClick={(e) => handleChange(e, tab.id)}
          >
            {tab.title}
          </span>
          {/* <span className='sort inner'></span> */}
        </div>
      ))}
    </div>
  );
};

export default Sort;
