import s from './index.module.css';
import { useForm } from 'react-hook-form';

const handleSubmit = (onSubmit) => {
  ////asdfsadff /
  // data
  // onSubmit(data)
};

export const RegistrationForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm({mode: 'onSubmit'});
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация</h3>
      <input
        className={s.input}
        type='text'
        placeholder='Имя'
        {...register('name', {
          required: "Обязательное поле",
          maxLength: {
            value: 10,
            message: 'слишком длинное имя'
          },
        })}
        // value={contactInfo.title}
        // onChange={handleChange}
      />
      <div>
        {errors?.name && <p style={{color: 'red'}}>{errors?.name?.message}</p>}
      </div>
      <input
        className={s.input}
        type='password'
        placeholder='Password'
        {...register('password', {
          required: "Обязательное поле",
          // minLength: {
          //   value: 5,
          //   message: 'слишком короткий пароль'
          // }
          pattern: {
            value:  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: `Пароль должен содержать минимум 11 символов, одну букву латинского алфавита и одну цифру`
          }
        })}
        // value={contactInfo.lastName}
        // onChange={handleChange}
      />
       <div>
        {errors?.password && <p style={{color: 'red'}}>{errors?.password?.message}</p>}
      </div>
      <input
        className={s.input}
        type='number'
        placeholder='Номер телефона'
        {...register('phoneNumber')}
        // value={contactInfo.phoneNumber}
        // onChange={handleChange}
      />
      <button className={s.button}> Sign Up</button>
    </form>
  );
};
