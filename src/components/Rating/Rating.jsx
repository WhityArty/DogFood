import cn from 'classnames';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ReactComponent as Star } from './star.svg';
import s from './index.module.css';

export const Rating = ({ rating, isEditable = false, setRating }) => {
  const [ratingArr, setRatingArr] = useState(new Array(5).fill(<></>));

  const changeDisplay = (rate) => {
    if (!isEditable) return;
    constructRating(rate);
  };

  const changeRating = (ratingState) => {
    if (!isEditable) return;
    setRating(ratingState);
  };

  const constructRating = useCallback(
    (currentRating) => {
      const updatedArray = ratingArr.map((ratingElement, index) => {
        return (
          <Star
            className={cn(s.star, {
              [s.filled]: index < currentRating,
              [s.editable]: !isEditable,
            })}
            onMouseEnter={() => changeDisplay(index + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => changeRating(index + 1)}
          />
        );
      });
      setRatingArr(updatedArray);
    },
    [isEditable, rating]
  );

  useEffect(() => {
    constructRating(rating);
  }, [constructRating]);
  return (
    <div>
      {ratingArr.map((r, i) => {
        return <span key={i}>{r}</span>;
      })}
    </div>
  );
};
