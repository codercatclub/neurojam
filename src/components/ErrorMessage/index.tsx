import { FC } from 'react';
import s from './index.module.css';

type ErrorMessageProps = {
  text: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => (
  <div className={s.text}>{text}</div>
);

export default ErrorMessage;
