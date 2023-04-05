import { useState, useEffect } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import "./index.scss";
import SeachInfo from "../SeachInfo";
import api from "../../utils/api";
import { ProductPage } from "../../pages/product/product";
import { CatalogPage } from "../../pages/catalog/catalog";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NoMatchFound } from "../../pages/noMatchFound/NoMatchFound";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { ThemeContext, themes } from "../../context/themeContext";
import { FaqPage } from "../../pages/faq/faq-page";
import { Favorite } from "../../pages/favorites/favorites";
import { isLiked } from "../../utils/utils";
import useDebounce from "../../hooks/useDebounce";
import { Modal } from "../Modal/modal";
import { useLocation } from "react-router-dom";
import { useCallback } from "react";
import { Login } from "../Login/login";
import { Register } from "../Register/Register";
import { ResetPassword } from "../ResetPassword/ResetPassword";
import { StyleGuide } from "../StyleGuide/StyleGuide";
import { Chart } from "../Chart/Chart";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { Profile } from "../Profile/Profile";
import { Blog } from "../../pages/blog/blog"

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../storageTK/user/userSlice";
import { parseJwt } from "../../utils/parseJWT";
import { useCurrentWidth } from "../../hooks/useCurrentWidth";
import { EditPost } from "../EditPost/EditPost";
import { CreateProduct } from "../CreateProduct/CreateProduct";
import { BasketPage } from "../../pages/basket/basketPage";

function App() {
  const [cards, setCards] = useState([]); // карточки
  const [searchQuery, setSearchQuery] = useState(""); //поиск
  const [currentUser, setCurrentUser] = useState(null); // пользователь
  const [theme, setTheme] = useState(themes.light);
  const [favorites, setFavorites] = useState([]); // избранное || лайки
  const [basket, setBasket] = useState([]); // корзина
  const [activeModal, setActiveModal] = useState(true); // модальное окно
  const [isAuthentificated, setAuthentificated] = useState(false); // авторизация
  const [isMobileView, setMobileView] = useState(false);
  const [size, setSize] = useState(10); // количество постов на странице
  const [total, setTotal] = useState(null); //предоставляет функциональным компонентам доступ к состоянию
  const [page, setPage] = useState(1); // страницы
  //const [posts, setPosts] = useState([]); // посты для блога
  const dispatch = useDispatch(); //Метод dispatch() передает объект, известный как действие, в Redux. 
                                  //Действие можно описать как “полезную нагрузку”, 
                                  //несущую type и все остальные данные, которые могут быть использованы для обновления состояния.

  const debounceSearchQuery = useDebounce(searchQuery, 2000);
  const navigate = useNavigate(); // поисковая строка
  // const cardsProd = useSelector(state => state.products.list.products);

  const checkCardLocal = (item) => { // фильтр карточек ( которые показаны в интернет магазине)
    return true; // возвращаем все карточки
    return (
      !item.pictures.includes("default-image") &&
      new Date(item.created_at) < new Date("2022-12-05T11:22:43.008Z")
    );
  };

  const handleRequest = () => { // поиск карточек
    api
      .search(debounceSearchQuery)
      .then((res) => setCards(res.filter((e) => checkCardLocal(e))))
      .catch((err) => console.log(err));
  };

  useEffect(() => { // авторизация
    if (!isAuthentificated) {
      return;
    }
    handleRequest();
  }, [debounceSearchQuery]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
    navigate("/");
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const user = useSelector((state)=>state.user.data);

  useEffect(() => {
    if (!isAuthentificated) {
      return;
    }
    Promise.all([api.getProductsList(page, size), api.getUserInfo()]).then(
      ([productsData, userData]) => {
        setCards(productsData.products.filter((e) => checkCardLocal(e)));
        setTotal(productsData.total);
        setCurrentUser(userData);
        const favProducts = productsData.products.filter((product) =>
          isLiked(product.likes, userData._id)
        );
        setFavorites(favProducts);
      }
    );
  }, [isAuthentificated, page, size]);

  useEffect(()=>{
    if (!user?.data?._id) {
      return
    }
    setCurrentUser(user);
  },[user])

  useEffect(() => {
    if (!isAuthentificated) {
      return;
    }
    dispatch(fetchUser());
  }, [isAuthentificated]);

  useEffect(() => { 
    if (!isAuthentificated) {
      return;
    }
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
  }, [isAuthentificated]);

  const handleProductLike = useCallback( // добавление карточек в избранное
    (product) => {
      const liked = isLiked(product.likes, currentUser?._id);

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
    },
    [cards, currentUser?._id]
  );

  const sortedData = (currentSort) => { // сортировка карточек
    switch (currentSort) {
      case "expensive":
        setCards([...cards.sort((a, b) => b.price - a.price)]);
        break;
      case "cheep":
        setCards([...cards.sort((a, b) => a?.price - b?.price)]);
        break;
      case "newest":
        setCards([
          ...cards.sort(
            (a, b) => new Date(b?.created_at) - new Date(a?.created_at)
          ),
        ]);
        break;
      case "popular":
        setCards([
          ...cards.sort((a, b) => b?.likes?.length - a?.likes?.length),
        ]);
        break;
      default:
        setCards([...cards.sort((a, b) => a.price - b.price)]);
        break;
    }
  };

  const toggleTheme = () => {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  };

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  useEffect(() => { // токен для восстановления пароля
    const haveToken = localStorage.getItem("token");
    setAuthentificated(!!haveToken);
  });

  let width = useCurrentWidth();

  useEffect(() => {
    if (width < 375) {
      setMobileView(true)
    } else setMobileView(false)
  }, [width])

  const cardProvider = { 
    cards,
    favorites,
    onSortData: sortedData,
    setBasket,
    basket
  };

  const userProvider = {
    currentUser,
    handleProductLike,
    isAuthentificated,
    activeModal,
    setActiveModal,
    setAuthentificated,
    setCurrentUser,
    setMobileView,
    isMobileView,
    setSize,
    setCards,
    setPage,
    page,
    size,
    total
  };

  const authRoutes = (
    <>
      <Route
        path="login" // модальное окно с входом в личный кабинет
        element={
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Login />
          </Modal>
        }
      ></Route>
      <Route
        path="register" // модальное окно регистрации 
        element={
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Register />
          </Modal>
        }
      ></Route>
      <Route
        path="reset-pass" // модальное окно с восстановлением страницы
        element={
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <ResetPassword setAuthentificated={setAuthentificated} />
          </Modal>
        }
      ></Route>
    </>
  );
  return (
    <>
      <CardContext.Provider value={cardProvider}>
        <UserContext.Provider value={userProvider}>
          <Header>
            <>
              <Logo className="logo logo_place_header" href="/" />
              <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
            </>
          </Header>
          {isAuthentificated ? (
            <main className={`content container`}>
              <SeachInfo searchCount={cards.length} searchText={searchQuery} />
              <Routes
                location={
                  backgroundLocation && {
                    ...backgroundLocation,
                    path: initialPath || location,
                  }
                }
              >
                <Route path="/" element={<CatalogPage />}></Route>
                <Route
                  path="product/:productId"
                  element={<ProductPage />}
                ></Route>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="faq" element={<FaqPage />}></Route>
                <Route
                  path="favorites"
                  element={
                    <PrivateRoute loggedIn={isAuthentificated}>
                      <Favorite />
                    </PrivateRoute>
                  }
                ></Route>
                <Route path="visual" element={<Chart />}></Route>
                <Route path="basket" element={<BasketPage />}></Route>
                {authRoutes}
                <Route path="style-guide" element={<StyleGuide />}></Route>
                <Route
                  path="edit-post/:postId"
                  element={
                    <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
                      <EditPost />
                    </Modal>
                  }
                ></Route>
                <Route path="*" element={<NoMatchFound />}></Route>
              </Routes>
              {backgroundLocation && <Routes>{authRoutes}</Routes>}
            </main>
          ) : (
            <div className="not-auth">
              Авторизуйтесь пожалуйста
              <Routes>{authRoutes}</Routes>
            </div>
          )}
          <Footer />
        </UserContext.Provider>
      </CardContext.Provider>
    </>
  );
}

export default App;
