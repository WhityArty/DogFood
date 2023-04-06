const onResponse = (res) => {
  const someTmp = res.ok
    ? res.json()
    : Promise.reject(`Ошибка : ${res.status}`);
  return someTmp;
};

class Api {
  constructor({ baseUrl, configuration, headers }) {
    this._baseUrl = baseUrl;
    this._configuration = configuration;
    this._headers = headers;

  }
  getProductsList(page = 1, size = 100) {
    return fetch(
      `${this._baseUrl}/products`,
      this._configuration()
    ).then(onResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._configuration()).then(
      onResponse
    );
  }
  search(searchQuery) {
    return fetch(
      `${this._baseUrl}/products/search?query=${searchQuery}`,
      this._configuration()
    ).then(onResponse);
  }
  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._configuration(),
      method: "PATCH",
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }
  changeLikeProduct(productId, isLike) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      method: isLike ? "DELETE" : "PUT",
      ...this._configuration(),
    }).then(onResponse);
  }
  getProductById(idProduct) {
    return fetch(
      `${this._baseUrl}/products/${idProduct}`,
      this._configuration()
    ).then(onResponse);
  }
  editPostById(postId, body) {
    return fetch(`${this._baseUrl}/v2/group-9/posts/${postId}`, {
      ...this._configuration(),
      method: "PATCH",
      body: JSON.stringify(body),

    }).then(onResponse);
  }
  deleteProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, {
      ...this._configuration(),
      method: "DELETE",
    }).then(onResponse);
  }
  getUsersById(userId) {
    return fetch(
      `${this._baseUrl}/v2/group-9/users/${userId}`,
      this._configuration()
    ).then(onResponse);
  }
  getUsers() {
    return fetch(
      `${this._baseUrl}/v2/group-9/users`,
      this._configuration()
    ).then(onResponse);
  }
  editUserAvatar(body) {
    return fetch(`${this._baseUrl}/v2/group-9/users/me/avatar`, {
      ...this._configuration(),
      method: "PATCH",
      body: JSON.stringify(body),
    }).then((res) => onResponse(res))
  }
  addReview(productId, body) {
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      ...this._configuration(),
      method: "POST",
      body: JSON.stringify(body),
    }).then(onResponse);
  }
  deleteReview(productId, reviewId) {
    return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
      ...this._configuration(),
      method: "DELETE",
    }).then(onResponse);
  }
  addProduct(body) {
    return fetch(`${this._baseUrl}/products`, {
      ...this._configuration(),
      method: "POST",
      body: JSON.stringify(body),
    }).then(onResponse);
  }
}

const configuration = () => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  configuration: configuration,
};

const api = new Api(config);

export default api;

export const getRickAndMortyList = async () => {
  return fetch(`https://rickandmortyapi.com/api/character/`, {
    headers: config.headers,
  }).then((res) => res.json());
};