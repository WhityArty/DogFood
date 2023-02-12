import { useContext } from 'react';
import CardList from '../../components/CardList/card-list';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';

export const Favorite = () => {
  const { favorites } = useContext(CardContext);
  const { handleProductLike } = useContext(UserContext);

  
  console.log('favorites in favorites page', favorites);

  return (
    <>
      <div>
        <h3>Избранное</h3>
        <div className='content__cards'>
          <CardList cards={favorites} onProductLike={handleProductLike} />
        </div>
      </div>
    </>
  );
};
