import { useContext } from 'react';
import { Basket } from '../../components/Basket/Basket';
import CardList from '../../components/CardList/card-list';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';

export const BasketPage = () => {
  const { favorites } = useContext(CardContext);
  const { handleProductLike } = useContext(UserContext);


  return (
    <>
      <div>
        <h3>Корзина</h3>
        <div className='content__cards'>
          <Basket />
        </div>
      </div>
    </>
  );
};
