import { useState } from 'react';
import api from '../../utils/api';
import s from './index.module.css';

export const Form = ({ title, handleFormSubmit, children, className }) => {
  return (
    <form className={className ?? s.form} onSubmit={handleFormSubmit}>
      <h1 className={s.title}>{title}</h1>
      {children}
    </form>
  );
};
