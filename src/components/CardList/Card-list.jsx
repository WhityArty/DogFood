import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import Card from '../Card/Card';
import './Card-list.css';

const CardList = ({ onProductLike, cards = [] }) => {
  return (
    <div className='cards'>
      {cards.map((item, index) => (
        <Card key={item._id} {...item} onProductLike={onProductLike} />
      ))}
    </div>
  );
};

export default CardList;
