import { useForm } from 'react-hook-form';
import { EMAIL_REGEXP, VALIDATE_CONFIG } from '../../constants/constants';
import { BaseButton } from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';
import '../Login/style.css';

export const ResetPassword = () => {
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

  const sendData = (data) => {
    console.log({ data });
  };

  return (
    <>
      <Form handleFormSubmit={handleSubmit(sendData)} title='Восстановление пароля'>
        <p className='auth__info' style={{ textAlign: 'left' }}>
          {' '}
          Для получения временного пароля необходимо ввести email, указанный при
          регистрации.
        </p>
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
        </div>

        <p className='auth__info' style={{ textAlign: 'left' }}>
          Срок действия временного пароля 24 ч.
        </p>
        <div className='auth__actions'>
          <BaseButton type='submit' color={'yellow'}>
            Отправить
          </BaseButton>
        </div>
      </Form>
    </>
  );
};
