const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }
  getProductsList() {
    return fetch(`${this._baseUrl}/products`, { headers: this._headers }).then(
      onResponse
    );
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      onResponse
    );
  }
  search(searchQuery) {

    return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
      headers: this._headers,
    }).then(onResponse);
  }
  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }
  changeLikeProduct(productId, isLike) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      method: isLike ? 'DELETE' : 'PUT',
      headers: this._headers,
    }).then(onResponse);
  }

  getProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, {
        headers: this._headers
    }).then(onResponse)
}
deleteProductById(idProduct) {
  return fetch(`${this._baseUrl}/products/${idProduct}`, {
      headers: this._headers,
      method: 'DELETE',
  }).then(onResponse)
}

}

const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
  },
};

const api = new Api(config);

export default api;
