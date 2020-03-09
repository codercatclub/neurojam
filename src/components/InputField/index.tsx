import React, { FC } from 'react';
import ErrorMessage from '../ErrorMessage';
import s from './index.module.css';

type InputProps = {
  name: string;
  value: string;
  type: string;
  validationMessage: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  onKeyDown?: () => void;
  autoComplete?: string;
};

const InputField: FC<InputProps> = ({
  name,
  value,
  placeholder,
  type,
  onChange,
  onKeyDown,
  className,
  autoComplete,
  validationMessage,
}) => (
  <div className={className}>
    <input
      className={`${s.input} ${!validationMessage && !!value ? s.valid : ''}`}
      placeholder={(placeholder || type).toUpperCase()}
      type={type}
      name={name || type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      onKeyDown={onKeyDown}
    />
    <ErrorMessage text={validationMessage} />
  </div>
);

export default InputField;
