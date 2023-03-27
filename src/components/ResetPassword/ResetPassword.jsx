import { notification } from 'antd'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  EMAIL_REGEXP,
  PASS_REGEXP,
  VALIDATE_CONFIG,
} from '../../constants/constants'
import { UserContext } from '../../context/userContext'
import { authApi } from '../../utils/authApi'
import { parseJwt } from '../../utils/parseJWT'
import { BaseButton } from '../BaseButton/BaseButton'
import { Form } from '../Form/Form'
import '../Login/style.scss'
import { openNotification } from '../Notification/Notification'

export const ResetPassword = ({ setAuthentificated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()

  console.log({ currentUser })

  const [tokenResp, setTokenResp] = useState(null)

  const emailRegister = register('email', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.email,
    },
  })
  console.log(tokenResp)
  const sendData = async (formData) => {
    if (tokenResp) {
      const { token, data } = await authApi.resetPassToken(
        { password: formData.password },
        formData.token,
      )
      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('userData', JSON.stringify(data))
        setAuthentificated(true)
        navigate('/')
      }
    } else {
      try {
        await authApi.resetPass(formData)
        setTokenResp(true)
      } catch (error) {
        openNotification("error", "Error", "Что-то пошло не так");  
      }
    }
  }

  const passwordRegister = register('password', {
    required: {
      value: !!tokenResp,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: PASS_REGEXP,
      message: VALIDATE_CONFIG.password,
    },
  })
  const tokenRegister = register('token', {
    required: {
      value: !!tokenResp,
      message: VALIDATE_CONFIG.requiredMessage,
    },
  })

  return (
    <>
      <Form
        handleFormSubmit={handleSubmit(sendData)}
        title="Восстановление пароля"
      >
        <p className="auth__info" style={{ textAlign: 'left' }}>
          Для получения временного пароля необходимо ввести email, указанный при
          регистрации.
        </p>
        <div className="auth__controls">
          <input
            {...emailRegister}
            className="auth__input"
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="auth__error">{errors?.email?.message}</p>
          )}
          <input
            {...passwordRegister}
            className="auth__input"
            type="password"
            name="password"
            placeholder="Пароль"
            disabled={!tokenResp}
          />
          {errors.password && (
            <p className="auth__error">{errors?.password?.message}</p>
          )}
          <input
            {...tokenRegister}
            className="auth__input"
            type="text"
            name="token"
            placeholder="Token"
            disabled={!tokenResp}
          />
        </div>

        <p className="auth__info" style={{ textAlign: 'left' }}>
          Срок действия временного пароля 24 ч.
        </p>
        <div className="auth__actions">
          <BaseButton type="submit" color={'yellow'}>
            Отправить
          </BaseButton>
        </div>
      </Form>
    </>
  )
}
