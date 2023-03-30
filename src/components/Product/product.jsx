import cn from "classnames";
import React from "react";
import s from "./index.module.scss";
import { ReactComponent as Save } from "./img/save.svg";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg";
import { ReactComponent as Basket } from "./img/basket.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Rating } from "../Rating/Rating";
import api from "../../utils/api";
import { BaseButton } from "../BaseButton/BaseButton";
import { Form } from "../Form/Form";
import { useForm } from "react-hook-form";
import "./styles.css";
import { VALIDATE_CONFIG } from "../../constants/constants";

export const Product = ({
  pictures,
  name,
  price,
  discount,
  onProductLike,
  likes = [],
  currentUser,
  description,
  reviews,
  onSendReview,
  deleteReview,
  stock,
}) => {
  const discount_price = Math.round(price - (price * discount) / 100);
  const isLike = likes.some((id) => id === currentUser?._id);
  const desctiptionHTML = { __html: description };

  const [isClicked, setClicked] = useState(isLike);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [counterCart, setCounterCart] = useState(0);
  const [reviewsProduct, setReviewsProduct] = useState(reviews?.slice(0, 2));

  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const location = useLocation();

  useEffect(() => {
    if (location.search.includes("name=dear")) {
      navigate("/");
    }
  }, [location.search]);

  const onLike = (e) => {
    onProductLike(e);
    setClicked((state) => !state);
  };

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data));
  }, []);

  const getUser = (id) => {
    if (!users.length) return "User";
    const user = users.find((el) => el._id === id);
    console.log({ user });
    if (user.avatar.includes('default-image')) {
      return {...user, avatar : 'https://img.freepik.com/free-vector/cute-fox-operating-laptop-cartoon-illustration_138676-2743.jpg'}
    }
    return user;
  };

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const reviewRegister = register("text", {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    minLength: { value: 5, message: "Минимум 5 символов" },
  });

  const sendReview = (data) => {
    onSendReview({ ...data, rating });
    setShowForm(false);
  };

  const handleCart = () => {
    const goods = localStorage.getItem("goods");
    if (!goods) {
      localStorage.setItem("goods", JSON.stringify([{ name, counterCart }]));
    } else {
      localStorage.setItem(
        "goods",
        JSON.stringify([...JSON.parse(goods), { name, counterCart }])
      );
    }
  };

  const showMore = () => {
    console.log();
    setReviewsProduct((state) => [...reviews.slice(0, state.length + 2)]);
  };
  const hideReview = () => {
    console.log();
    setReviewsProduct((state) => [...reviews.slice(0, 2)]);
  };

  return (
    <>
      <div>
        <button onClick={handleClick} className="btn">
          Назад
        </button>
        <h1 className={s.productTitle}>{name}</h1>
        <div className={s.rateInfo}>
          <span>
            Артикул : <b>238907</b>
          </span>
          <Rating isEditable={true} rating={rating} setRating={setRating} />
          <span className={s.reviewsCount}>
            {reviewsProduct?.length} отзывов
          </span>
        </div>
      </div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img src={pictures} alt={`Изображение ${name}`} />
        </div>
        <div className={s.desc}>
          <span className={discount ? s.oldPrice : s.price}>
            {price}&nbsp;₽
          </span>
          {!!discount && (
            <span className={cn(s.price, "card__price_type_discount")}>
              {discount_price}&nbsp;₽
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button
                className={s.minus}
                onClick={() =>
                  counterCart > 0 && setCounterCart(counterCart - 1)
                }
              >
                -
              </button>
              <span className={s.num}>{counterCart}</span>
              <button
                className={s.plus}
                onClick={() =>
                  stock > counterCart && setCounterCart(counterCart + 1)
                }
              >
                +
              </button>
            </div>
            <button
              href="/#"
              className={cn("btn", "btn_type_primary", s.cart)}
              onClick={handleCart}
            >
              В корзину
            </button>
          </div>
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isClicked })}
            onClick={(e) => onLike(e)}
          >
            <Save />
            <span>{isClicked ? "В избранном" : "В избранное"}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <p className={s.subtitle} dangerouslySetInnerHTML={desctiptionHTML}></p>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
      <div className={s.reviews}>
        <div className={s.reviews__control}>
          <span className={s.reviews__title}>Отзывы</span>{" "}
          <span className={s.reviews__more} onClick={showMore}>
            Еще отзывы
          </span>
          <span className={s.reviews__more} onClick={hideReview}>
            Свернуть
          </span>
          {!showForm ? (
            <button
              className={s.reviews__btn}
              onClick={() => setShowForm(true)}
            >
              Оставить отзыв
            </button>
          ) : (
            <Form
              className={s.form}
              handleFormSubmit={handleSubmit(sendReview)}
              title="Написать отзыв"
            >
              <div className={s.form__rating}>
                Общая оценка{" "}
                <Rating
                  isEditable={true}
                  rating={rating}
                  setRating={setRating}
                />
              </div>
              <textarea
                {...reviewRegister}
                className={s.textarea}
                type="text"
                name="text"
                placeholder="Поделитесь впечатлениями о товаре"
              />
              {errors.textarea && (
                <p className="auth__error">{errors?.textarea?.message}</p>
              )}
              <div className={s.form__btn}>
                <BaseButton type="submit" color={"yellow"}>
                  Отправить
                </BaseButton>
              </div>
            </Form>
          )}
        </div>

        {reviewsProduct
          ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((e) => {
            const author = getUser(e.author);

            return (
              <div key={e.created_at} className={s.review}>
              <div className={s.review__author}>
                <div className={s.review__info}>
                  <span>{getUser(e.author)} </span>
                  <span className={s.review__date}>
                    {new Date(e.created_at).toLocaleString("ru", options)}
                  </span>
                  {e.author === currentUser?._id && (
                    <span className={s.basket} onClick={() => deleteReview(e._id)}>
                       <Basket />
                    </span>
                  )}
                </div>
                <Rating rating={e.rating} />
              </div>
              <div className={s.text}>
                <span>{e.text}</span>
              </div>
            </div>
          )})};
      </div>
    </>
  );
};
