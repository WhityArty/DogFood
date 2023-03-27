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

import { getAllProducts } from "../../storageTK/actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../storageTK/user/userSlice";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(themes.light);
  const [favorites, setFavorites] = useState([]);
  const [activeModal, setActiveModal] = useState(true);
  const [isAuthentificated, setAuthentificated] = useState(false);

  const debounceSearchQuery = useDebounce(searchQuery, 2000);
  const navigate = useNavigate();

  // отфильтровал карточки на клиенте по времени создания и пустому изображению
  const checkCardLocal = (item) => {
    // return true
    return (
      !item.pictures.includes("default-image") &&
      new Date(item.created_at) < new Date("2022-12-05T11:22:43.008Z")
    );
  };

  const handleRequest = () => {
    api
      .search(searchQuery)
      .then((res) => setCards(res.filter((e) => checkCardLocal(e))))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
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

  const handleProductLike = useCallback(
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

  const sortedData = (currentSort) => {
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

  useEffect(() => {
    const haveToken = localStorage.getItem("token");
    setAuthentificated(!!haveToken);
  });

  const cardProvider = {
    cards,
    favorites,
    onSortData: sortedData,
  };

  const userProvider = {
    currentUser,
    handleProductLike,
    isAuthentificated,
    setActiveModal,
    setAuthentificated,
    setCurrentUser
  };

  const authRoutes = (
    <>
      <Route
        path="login"
        element={
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Login />
          </Modal>
        }
      ></Route>
      <Route
        path="register"
        element={
          <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
            <Register />
          </Modal>
        }
      ></Route>
      <Route
        path="reset-pass"
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
      <ThemeContext.Provider value={{ theme: themes, toggleTheme }}>
        <CardContext.Provider value={cardProvider}>
          <UserContext.Provider value={userProvider}>
            <Header>
              <>
                <Logo className="logo logo_place_header" href="/" />
                <Search
                  searchQuery={searchQuery}
                  onSubmit={handleFormSubmit}
                  onInput={handleInputChange}
                />
              </>
            </Header>
            {isAuthentificated ? (
              <main
                className={`content container content__${
                  theme.light ? "light" : "dark"
                }`}
              >
                <SeachInfo
                  searchCount={cards.length}
                  searchText={searchQuery}
                />
                <Routes
                  location={
                    backgroundLocation && {
                      ...backgroundLocation,
                      path: initialPath || location,
                    }
                  }
                >
                  <Route index element={<CatalogPage />}></Route>
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
                  {authRoutes}
                  <Route path="style-guide" element={<StyleGuide />}></Route>

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
      </ThemeContext.Provider>
    </>
  );
}

export default App;

// Как сравнивает реакт
// 1 реакт сравнивает по ссылке стейты
// 2 реакт сравнивает по содержимому
// setCards()
