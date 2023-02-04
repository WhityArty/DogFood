import Card from '../Card/Card';
import './Card-list.css';

const CardList = ({ goods, currentUser, onProductLike }) => {
  return (
    <div className='cards'>
      {goods.map((item, index) => (
        <Card
          key={item._id}
          {...item}
          currentUser={currentUser}
          onProductLike={onProductLike}
        />
      ))}
    </div>
  );
};

export default CardList;
