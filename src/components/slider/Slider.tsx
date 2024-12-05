import React from 'react';
import { Input } from '@components/input/Input';
import styles from '@styles/Slider.module.css';

export interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  value,
  onChange,
  variant = 'light',
  className,
  ...props
}) => {
  const sliderClasses = [
    styles.slider,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={sliderClasses}>
      <Input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.sliderInput}
        {...props}
      />
      <div className={styles.sliderValue}>{value}</div>
    </div>
  );
};
