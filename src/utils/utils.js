import {
    EMAIL_REGEXP,
    PASS_REGEXP,
    VALIDATE_CONFIG,
  } from '../constants/constants'
  
  export const isLiked = (likes, userId) => likes.some((id) => id === userId)//some() проверяет, удовлетворяет ли какой-либо элемент массива условию
  
  export const emailRegister = (register) =>
    register('email', {
      required: {
        value: true,
        message: VALIDATE_CONFIG.requiredMessage,
      },
      pattern: {
        value: EMAIL_REGEXP,
        message: VALIDATE_CONFIG.email,
      },
    })
  
  export const passwordRegister = (register) =>
    register('password', {
      required: {
        value: true,
        message: VALIDATE_CONFIG.requiredMessage,
      },
      pattern: {
        value: PASS_REGEXP,
        message: VALIDATE_CONFIG.password,
      },
    })
  