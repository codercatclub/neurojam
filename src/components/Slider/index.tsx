import React, { FC } from 'react';
import ErrorMessage from '../ErrorMessage';
import s from './index.module.css';

type SliderProps = {
  name: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  className: string;
  inputClass: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Slider: FC<SliderProps> = ({
  name,
  label,
  value,
  min,
  max,
  step,
  className,
  inputClass,
  onChange,
}) => (
  <div className={`${s.container} ${className}`}>
    <div className={s.label}>{label}</div>
    <input
      name={name}
      value={value}
      type="range"
      min={min}
      max={max}
      step={step}
      className={`${s.slider} ${inputClass}`}
      onChange={onChange}
    />
    <div className={s.value}>{value}</div>
  </div>
);

export default Slider;
