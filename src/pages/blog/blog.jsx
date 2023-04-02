import React, { useContext } from "react";
import Card from "../../components/Card/card";
import CardList from "../../components/CardList/card-list";
import Sort from "../../components/Sort/sort";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

import "./index.css";

export const CatalogPage = () => {
  const { cards } = useContext(CardContext);
  const { handleProductLike } = useContext(UserContext);

  return (
    <div className="catalog-page">
      <Sort />
      <div className="content__cards">
        <div className="cards">
          {cards.map((item) => (
            <Card key={item._id} {...item} onProductLike={handleProductLike} />
          ))}
        </div>
      </div>
    </div>
  );
};
