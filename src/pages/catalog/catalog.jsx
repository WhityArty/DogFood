import React, { useContext } from 'react';
import CardList from '../../components/CardList/card-list';
import Sort from '../../components/Sort/sort';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';

import './index.css';

export const CatalogPage = () => {
  const { cards } = useContext(CardContext);
  const { handleProductLike } = useContext(UserContext);

  return (
    <div className='catalog-page'>
      <Sort />
      <div className='content__cards'>
        <CardList cards={cards} onProductLike={handleProductLike} />
      </div>
    </div>
  );
};