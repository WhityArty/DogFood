import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  EMAIL_REGEXP,
  PASS_REGEXP,
  VALIDATE_CONFIG,
} from '../../constants/constants';
import { authApi, registration } from '../../utils/authApi';
import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';
import '../Login/style.scss';

export const Register = () => {
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

  const sendData = async (data) => {
    console.log({ data });
    // await authApi.register({...data, group: 'group-9'});
    await registration({...data, group: 'group-9'});

  };

  const navigate = useNavigate();

  return (
    <>
      <Form handleFormSubmit={handleSubmit(sendData)} title='Регистрация'>
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

          <p className='auth__info'  style={{textAlign: 'left'}} onClick={() => {}}>
            Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
            Политикой конфиденциальности и соглашаетесь на информационную
            рассылку.
          </p>
          <div className='auth__actions'>
            <BaseButton type='submit' color={'yellow'}>
              Зарегистрироваться
            </BaseButton>
            <BaseButton type='button' color={'white'} onClick={() => navigate('/login')}>
              Войти
            </BaseButton>
          </div>
      </Form>
    </>
  );
};
