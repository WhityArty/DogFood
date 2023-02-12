import { useState, useEffect } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/Sort';
import './index.css';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import { ProductPage } from '../../pages/product/product';
import { CatalogPage } from '../../pages/catalog/catalog';

import { Route, Routes } from 'react-router-dom';

import { NoMatchFound } from '../../pages/noMatchFound/NoMatchFound';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { ThemeContext, themes } from '../../context/themeContext';
import { FaqPage } from '../../pages/faq/faq-page';
import { Favorite } from '../../pages/favorites/favorites';
import { isLiked } from '../../utils/utils';
import { Form } from '../Form/Form';
import useDebounce from '../../hooks/useDebounce';
import { RegistrationForm } from '../Form/RegistrationForm';
import { Modal } from '../Modal/modal';

import { useLocation } from 'react-router-dom';

import { useCallback } from 'react';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { ResetPassword } from '../ResetPassword/ResetPassword';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(themes.light);
  const [favorites, setFavorites] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeModal, setActiveModal] = useState(true);

  const debounceSearchQuery = useDebounce(searchQuery, 2000);

  // отфильтровал карточки на клиенте по времени создания и пустому изображению
  const checkCardLocal = (item) => {
    // return true
    return (
      !item.pictures.includes('default-image') &&
      new Date(item.created_at) < new Date('2022-12-05T11:22:43.008Z')
    );
  };

  const handleRequest = () => {
    api
      .search(searchQuery)
      .then((res) => setCards(res.filter((e) => checkCardLocal(e))))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleRequest();
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
        setCards(productsData.products.filter((e) => checkCardLocal(e)));
        setCurrentUser(userData);
        const favProducts = productsData.products.filter((product) =>
          isLiked(product.likes, userData._id)
        );
        setFavorites(favProducts);
      }
    );
  }, []);

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData).then((newUser) => {
      setCurrentUser(newUser);
    });
  }
  const  handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser?._id);

    console.log({ product, liked });

    api.changeLikeProduct(product._id, liked).then((newCard) => {
      const newProducts = cards.map((cardState) => {
        return cardState._id === newCard._id ? newCard : cardState;
      });

      if (!liked) {
        setFavorites((prevState) => [...prevState, newCard]);
      } else
        setFavorites((prevState) => {
          return prevState.filter((card) => card._id !== newCard._id);
        });
      setCards(newProducts);
    });
  },[cards, currentUser?._id])

  const sortedData = (currenSort) => {
    switch (currenSort) {
      case 'expensive':
        setCards([...cards.sort((a, b) => b.price - a.price)]);
        break;
      case 'cheep':
        setCards([...cards.sort((a, b) => a?.price - b?.price)]);
        break;
      case 'newest':
        setCards([
          ...cards.sort(
            (a, b) => new Date(b?.created_at) - new Date(a?.created_at)
          ),
        ]);
        break;
      case 'popular':
        setCards([
          ...cards.sort((a, b) => b?.likes?.length - a?.likes?.length),
        ]);
        break;
      default:
        setCards([...cards.sort((a, b) => a.price - b.price)]);
        break;
    }
  };

  const valueProvider = {
    cards,
    favorites,
    onSortData: sortedData,
  };

  const userProvider = {
    color: 'red',
    currentUser: currentUser,
    handleProductLike: handleProductLike,
  };

  const toggleTheme = () => {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  };
  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };
  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  return (
    <>
      <ThemeContext.Provider value={{ theme: themes, toggleTheme }}>
        <CardContext.Provider value={valueProvider}>
          <UserContext.Provider value={userProvider}>
            <Header setActiveModal={setActiveModal}>
              <>
                <Logo className='logo logo_place_header' href='/' />
                <Search
                  onSubmit={handleFormSubmit}
                  onInput={handleInputChange}
                />
              </>
            </Header>

            
            <main
              className={`content container content__${
                theme.light ? 'light' : 'dark'
              }`}
            >
              <SeachInfo searchCount={cards.length} searchText={searchQuery} />
              <Routes>
                <Route path='/' element={<CatalogPage />}></Route>
                <Route
                  path='/product/:productId'
                  element={<ProductPage />}
                ></Route>
                <Route path='/faq' element={<FaqPage />}></Route>
                <Route path='/favorites' element={<Favorite />}></Route>

                <Route path='*' element={<NoMatchFound />}></Route>
              <Route path='/login' element={
                  <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                    <Login />
                  </Modal>
                  }>
                </Route>
                <Route path='/register' element={
                  <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                    <Register />
                  </Modal>
                  }>
                </Route>
                <Route path='/reset-pass' element={
                  <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                    <ResetPassword />
                  </Modal>
                  }>
                </Route>
              </Routes>
            </main>
            <Footer />
          </UserContext.Provider>
        </CardContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;

// Как сравнивает реакт
// 1 реакт сравнивает по ссылке стейты
// 2 реакт сравнивает по содержимому
// setCards()
