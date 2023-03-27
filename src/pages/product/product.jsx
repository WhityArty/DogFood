import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { openNotification } from "../../components/Notification/Notification";
import { Product } from "../../components/Product/product";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import api from "../../utils/api";

export const ProductPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);


  const { handleProductLike } = useContext(UserContext);
  const { favorites } = useContext(CardContext);

  const onProductLike = (e) => {
    console.log(e);
    handleProductLike(product);
    setProduct({ ...product });
  };

  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    api.getUserInfo().then((userData) => setCurrentUser(userData));
    api
      .getProductById(productId)
      .then((productData) => setProduct(productData))
      .catch((err) => {
        console.log("err", err);
        navigate("/");
      })
      .finally(() => setIsLoading(false));
  }, [productId, favorites]);

  const onSendReview = async (data) => {
    try {
      const result = await api.addReview(product._id, data);
      openNotification("success", "Success", "Ваш отзыв успешно отправлен");
      setProduct({ ...result });
    } catch (error) {
      openNotification("error", "Error", "Не получилось отправить отзыв");
    }
  };

  const deleteReview = async (id) => {
    try {
      const result = await api.deleteReview(product._id, id);
      setProduct({ ...result });
      openNotification("success", "Success", "Ваш отзыв успешно удален");
    } catch (error) {
      openNotification("error", "Error", "Не получилось удалить отзыв");
    }
  };

  useEffect(() => {
    if (product?.reviews && Array.isArray(product?.reviews)) {
      setReviews([...product?.reviews?.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))])
    }
  }, [product?.reviews]);


  return (
    <>
      <div className="content__cards">
        {isLoading ? (
          <Spinner />
        ) : (
          <Product
            {...product}
            reviews={reviews}
            currentUser={currentUser}
            onProductLike={onProductLike}
            setProduct={setProduct}
            onSendReview={onSendReview}
            deleteReview={deleteReview}
          />
        )}
      </div>
    </>
  );
};
