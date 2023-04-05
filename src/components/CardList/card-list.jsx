import Card from '../Card/card';
import './index.scss';

const CardList = ({ onProductLike, cards = [] }) => {
  return (
    <div className='cards'>
      {cards.length && cards.map((product) => (
        <Card key={product._id} product={product} {...product} onProductLike={onProductLike} />
      ))}
    </div>
  );
};

export default CardList;
