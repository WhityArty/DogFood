import { Select } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../../components/Blog/Blog";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

import "./index.css";






export const CatalogPage = () => {
  const { handleProductLike, size, setSize, page, setPage, total } = useContext(UserContext);
  const [paginated, setPaginated] = useState([]);
  const [pageOptions, setPageOptions] = useState([]);

  const optionsSize = [
    {
      value: 5,
      label: '5'
    },
    {
      value: 10,
      label: '10'
    },
    {
      value: 50,
      label: '50'
    },
  ];

  //const paginator = useCallback(() => {
  //  const arr = new Array(total).fill({});
  //  const newArr = arr.map((e, i) => ({
  //    value: i + 1,
  //    label: `${i + 1}`
  //  }))
 //   console.log({ arr, newArr, posts })
 //   setPageOptions(newArr);
 // }, [posts.length, size])

 // useEffect(() => {
  //  paginator()
  //}, [paginator, page, size, posts.length])

  const navigate = useNavigate()

  //GET https://api.react-learning.ru/v2/:groupId/posts/paginate?page=<номер страницы>&limit=<число ограничивающее вывод на страницу>&query=<строка фильтрации 
  // по title> //добавление навигации
  // https://api.react-learning.ru/v2/:groupId/posts/paginate?page=${page}&limit=${size}

  // useEffect(() => {
  //   const sliced = cards.slice((page-1) * size, size * page)
  //   setPaginated(sliced);
  //   navigate(`/?page=${page}&limit=${size}`)
  // }, [cards, page, size, navigate]);

  return (
    <div className="catalog-page">
      <div className="content__posts">
        <div className="posts">
        </div>
      </div>
      <div>
        <Select value={size} options={optionsSize} onChange={setSize} />
        <Select style={{ width: 120 }} value={page} options={pageOptions} onChange={setPage} />
      </div>
    </div>
  );
};
