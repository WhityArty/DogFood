import React, { useState } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Footer from '../../components/Footer/footer';
import Header from '../../components/Header/header';
import Logo from '../../components/Logo/logo';
import { Product } from '../../components/Product/product';
import Search from '../../components/Search/search';
import Spinner from '../../components/Spinner';
import { UserContext } from '../../context/userContext';
import api from '../../utils/api';

const productId = '622c77e877d63f6e70967d22';
export const ProductPage = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const { handleProductLike } = useContext(UserContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleRequest = () => {
    // const filterCards = cards.filter((item) =>
    //   item.name.toUpperCase().includes(searchQuery.toUpperCase())
    // );
    // setCards(filterCards);

    api
      .search(searchQuery)
      .then((res) => setCards(res))
      .catch((err) => console.log(err));
  };
  const onProductLike = (e) => {
    console.log(e);
    // handleProductLike(product);
  };

  const { productId } = useParams();

  console.log(productId);

  useEffect(() => {
    setIsLoading(true);
    api.getUserInfo().then((userData) => setCurrentUser(userData));
    api
      .getProductById(productId)
      .then((productData) => setProduct(productData))
      .catch((err) => console.log('err', err))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
    <>
      <div className='content__cards'>
        {isLoading ? (
          <Spinner />
        ) : (
          <Product
            {...product}
            currentUser={currentUser}
            onProductLike={onProductLike}
          />
        )}
      </div>
    </>
  );
};
