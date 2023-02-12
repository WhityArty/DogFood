import cn from 'classnames';
import React from 'react';
import s from './index.module.css';
import { ReactComponent as Save } from './img/save.svg';
import truck from './img/truck.svg';
import quality from './img/quality.svg';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Rating } from '../Rating/Rating';

export const Product = ({
  pictures,
  name,
  price,
  discount,
  onProductLike,
  likes = [],
  currentUser,
  description,
}) => {
  const discount_price = Math.round(price - (price * discount) / 100);
  const isLike = likes.some((id) => id === currentUser?._id);
  const desctiptionHTML = { __html: description };

  const [isClicked, setClicked] = useState(isLike);

  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const location = useLocation();

  useEffect(()=>{
    if (location.search.includes('name=dear')) {
      navigate('/');
    }
  }, [location.search]);

 const onLike = (e) => {
  onProductLike(e);
  setClicked(state => !state)
 }


  return (
    <>
      <div>
        <button onClick={handleClick} className='btn'>
          Назад
        </button>
        <h1 className={s.productTitle}>{name}</h1>
        <div>
          <span> Артикул : </span> <b>238907</b>
          <Rating />
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
          {discount && (
            <span className={cn(s.price, 'card__price_type_discount')}>
              {discount_price}&nbsp;₽
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <a href='/#' className={cn('btn', 'btn_type_primary', s.cart)}>
              В корзину
            </a>
          </div>
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isClicked })}
            onClick={(e) => onLike(e)}
          >
            <Save />
            <span>{isClicked ? 'В избранном' : 'В избранное'}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt='truck' />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt='quality' />
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
    </>
  );
};
