import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  EMAIL_REGEXP,
  PASS_REGEXP,
  VALIDATE_CONFIG,
} from '../../constants/constants';
import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';
import './style.css';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const emailRegister = register('email', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: EMAIL_REGEXP,
      message: VALIDATE_CONFIG.email,
    },
  });
  const passwordRegister = register('password', {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
    pattern: {
      value: PASS_REGEXP,
      message: VALIDATE_CONFIG.password,
    },
  });

  const sendData = (data) => {
    console.log({ data });
  };
  const navigate = useNavigate();
  return (
    <>
      <Form handleFormSubmit={handleSubmit(sendData)} title='Вход'>
        <div className='auth__controls'>
          <input
            {...emailRegister}
            className='auth__input'
            type='email'
            name='email'
            placeholder='Email'
          />
          {errors.email && (
            <p className='auth__error'>{errors?.email?.message}</p>
          )}

          <input
            {...passwordRegister}
            className='auth__input'
            type='password'
            name='password'
            placeholder='Пароль'
          />
          {errors.password && (
            <p className='auth__error'>{errors?.password?.message}</p>
          )}
        </div>
        <p className='auth__info auth__link' onClick={() => navigate('/reset-pass')}>
          Восстановить пароль
        </p>
        <div className='auth__actions'>
          <BaseButton type='submit' color={'yellow'}>
            Войти
          </BaseButton>
          <BaseButton type='button' color={'white'} onClick={() => navigate('/register')}>
            Регистрация
          </BaseButton>
        </div>
      </Form>
    </>
  );
};
