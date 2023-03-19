"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLiked = void 0;

var isLiked = function isLiked(likes, userId) {
  return likes.some(function (id) {
    return id === userId;
  });
};

exports.isLiked = isLiked;