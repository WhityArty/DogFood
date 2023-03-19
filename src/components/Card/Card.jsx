import cn from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import api from '../../utils/api';

import './index.scss';
import { ReactComponent as Save } from './save.svg';

const Card = ({
  name,
  price,
  discount,
  wight,
  description,
  pictures,
  tags,
  likes,
  onProductLike,
  _id,
}) => {
  const { currentUser } = useContext(UserContext);
  const liked = likes.some((id) => id === currentUser?._id);
  const discount_price = Math.round(price - (price * discount) / 100);

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
        <img src={pictures} alt={description} className='card__image' />
        <div className='card__desc'>
          <span className={discount !== 0 ? 'card__old-price' : 'card__price'}>
            {price}&nbsp;₽
          </span>
          {discount !== 0 && (
            <span className='card__price card__price_type_discount'>
              {discount_price}&nbsp;₽
            </span>
          )}
          <span className='card__wight'>{wight}</span>
          <p className='card__name'>{name}</p>
        </div>
      </Link>
      <a href='#' className='card__cart btn btn_type_primary'>
        В корзину
      </a>
    </div>
  );
};

export default Card;
