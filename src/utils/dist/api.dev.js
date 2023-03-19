"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var onResponse = function onResponse(res) {
  return res.ok ? res.json() : Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 : ".concat(res.status));
};

var Api =
/*#__PURE__*/
function () {
  function Api(_ref) {
    var baseUrl = _ref.baseUrl,
        headers = _ref.headers;

    _classCallCheck(this, Api);

    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _createClass(Api, [{
    key: "getProductsList",
    value: function getProductsList() {
      return fetch("".concat(this._baseUrl, "/products"), {
        headers: this._headers
      }).then(onResponse);
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      return fetch("".concat(this._baseUrl, "/users/me"), {
        headers: this._headers
      }).then(onResponse);
    }
  }, {
    key: "search",
    value: function search(searchQuery) {
      return fetch("".concat(this._baseUrl, "/products/search?query=").concat(searchQuery), {
        headers: this._headers
      }).then(onResponse);
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(dataUser) {
      return fetch("".concat(this._baseUrl, "/users/me"), {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify(dataUser)
      }).then(onResponse);
    }
  }, {
    key: "changeLikeProduct",
    value: function changeLikeProduct(productId, isLike) {
      return fetch("".concat(this._baseUrl, "/products/likes/").concat(productId), {
        method: isLike ? 'DELETE' : 'PUT',
        headers: this._headers
      }).then(onResponse);
    }
  }, {
    key: "getProductById",
    value: function getProductById(idProduct) {
      return fetch("".concat(this._baseUrl, "/products/").concat(idProduct), {
        headers: this._headers
      }).then(onResponse);
    }
  }, {
    key: "deleteProductById",
    value: function deleteProductById(idProduct) {
      return fetch("".concat(this._baseUrl, "/products/").concat(idProduct), {
        headers: this._headers,
        method: 'DELETE'
      }).then(onResponse);
    }
  }]);

  return Api;
}();

var config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac'
  }
};
var api = new Api(config);
var _default = api;
exports["default"] = _default;