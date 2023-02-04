import { useState, useEffect } from 'react';
import CardList from '../CardList/Card-list';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import Sort from '../Sort/Sort';
import './App.css';
import SeachInfo from '../SeachInfo/SeachInfo';
import api from '../../utils/api';
// import useDebounce from '../../hooks/useDebounce';

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const debounceSearchQuery = useDebounce(searchQuery, 2000);

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

  useEffect(() => {
    handleRequest();
    console.log('INPUT', searchQuery);
  }, [debounceSearchQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  useEffect(() => {
    Promise.all([api.getProductsList(), api.getUserInfo()]).then(
      ([productsData, userData]) => {
        setCards(productsData.products);
        setCurrentUser(userData);
      }
    );
    // api.getProductsList().then((data) => setCards(data.products));
    // api.getUserInfo().then((userData)=>setCurrentUser(userData))
  }, []);

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUser) => {
      setCurrentUser(newUser);
    });
  }
  function handleProductLike(product) {
    const liked = product.likes.some((id) => id === currentUser?._id);
    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        console.log('Карточка из стейта', cardState);
        console.log('Карточка из сервера', newCard);
        return cardState._id === newCard._id ? newCard : cardState;
      });
      setCards(newProducts);
    });
  }

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className='logo logo_place_header' href='/' />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={searchQuery} />
        <Sort />
        <div className='content__cards'>
          <CardList
            goods={cards}
            currentUser={currentUser}
            onProductLike={handleProductLike}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
