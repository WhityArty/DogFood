import React, { useContext } from 'react';
import CardList from '../../components/CardList/card-list';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';

export const CatalogPage = () => {
  const { cards } = useContext(CardContext);
  const { handleProductLike } = useContext(UserContext);

  return (
    <>
      <div className='content__cards'>
        <CardList cards={cards} onProductLike={handleProductLike} />
      </div>
    </>
  );
};
