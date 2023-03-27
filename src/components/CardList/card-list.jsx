import Card from '../Card/card';
import './index.scss';

const CardList = ({ onProductLike, cards = [] }) => {
  return (
    <div className='cards'>
      {cards.map((item) => (
        <Card key={item._id} {...item} onProductLike={onProductLike} />
      ))}
    </div>
  );
};

export default CardList;
