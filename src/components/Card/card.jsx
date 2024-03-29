import cn from 'classnames';
import { useContext } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { CardContext } from "../../context/cardContext";
import { UserContext } from '../../context/userContext';
import api from '../../utils/api';

import './index.scss';
import { ReactComponent as Save } from './save.svg';

const Card = ({
  name,
  stock,
  price,
  discount,
  wight,
  description,
  pictures,
  image,
  tags,
  _id,
  likes,
  onProductLike,
  product,
}) => {
  const { setBasket, basket } = useContext(CardContext);
  const { currentUser } = useContext(UserContext);
  const liked = likes.some((id) => id === currentUser?._id);
  const discount_price = Math.round(price - (price * discount) / 100);
  
  const addToBasket = () => {
   //  setBasket((state) => {
   //     console.log({ state });
    //   const findEl = state.find(e => e.product._id === _id);
    //   if (findEl) {
    //      //return [];
    //     console.log({ state, findEl });
   //      const newState = state.map(e => {
   //        if (e.product._id === findEl.product._id) {
   //          return { product: item, count: e.count + 1 }
   //        }
   //        return e
   //      })
   //      return newState
   //    } else {
    //     console.log({ _id });
    //     return [...state, { product: item, count: 1 }]
    //   }
   //  })
    setBasket((st) => [...st, product])
  }

  return (
    <div className='card'>
      <div className='card__sticky card__sticky_type_top-left'>
        {discount !== 0 && (
          <span className='card__discount'>{`-${discount}%`}</span>
        )}
        {tags &&
          tags.map((tag) => (
            <span
              key={tag}
              className={cn('tag', { [`tag_type_${tag}`]: true })}
            >
              {tag}
            </span>
          ))}
      </div>
      <div className='card__sticky card__sticky_type_top-right'>
        <button
          className={cn('card__favorite', {
            'card__favorite_is-active': liked,
          })}
          onClick={() => onProductLike({ _id, likes })}
        >
          <Save className='card__favorite-icon' />
        </button>
      </div>

      <Link to={`/product/${_id}`} className='card__link'>
      <img src={pictures ?? image} alt={description} className="card__image" />
        <div className="card__desc">
          {price && <span className={discount !== 0 ? "card__old-price" : "card__price"}>
            {price}&nbsp;₽
          </span>}
          {!!discount && (
            <span className="card__price card__price_type_discount">
              {discount_price}&nbsp;₽
            </span> 
          )}
          <p className="card__wight">{stock}&nbsp;шт</p>
          <p className="card__name">{name}</p>
        </div>
      </Link>
      <span className="card__cart btn btn_type_primary" onClick={addToBasket}>
        В корзину
      </span>
    </div>
  );
};

export default Card;
