const onResponse = (res) => {
  const someTmp = res.ok
    ? res.json()
    : res.json().then((data)=> Promise.reject(data.message));
  return someTmp;
};

class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }
  login(dataUser) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataUser),
      // {email: '', password: ''}
    }).then(onResponse);
  }
  register(dataUser) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }
  resetPass(dataUser) {
    return fetch(`${this._baseUrl}/forgot-password`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }
  resetPassToken(dataUser, token) {
    return fetch(`${this._baseUrl}/password-reset/${token}`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
  },
};

export const authApi = new Api(config);

export const login = (dataUser) => {
  return fetch(`${config.baseUrl}/signin`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(dataUser),
    // {email: '', password: ''}
  }).then(onResponse);
};
// signup

export const registration = (data) => {
  return fetch(`${config.baseUrl}/signup`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(data),
  }).then(onResponse);
};
export const resetPass = (data) => {
  return fetch(`${config.baseUrl}/password-reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(data),
  }).then(onResponse);
};
export const resetPassToken = (data, userId, token) => {
  return fetch(`${config.baseUrl}/password-reset/${userId}/${token}`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(data),
  }).then(onResponse);
};
