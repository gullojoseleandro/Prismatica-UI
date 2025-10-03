import React from 'react';
import { Input } from '@components/input/Input';
import styles from '@styles/Slider.module.css';

/**
 * Props for the `Slider` component.
 * - `min`: minimum range value.
 * - `max`: maximum range value.
 * - `value`: current value.
 * - `onChange`: callback when value changes.
 * - `variant`: visual theme.
 * - `className`: additional CSS classes.
 */
export interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  className?: string;
}

/**
 * Slider control based on styled `<input type="range">`.
 *
 * @example
 * ```tsx
 * <Slider min={0} max={100} value={50} onChange={setValue} />
 * ```
 */
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
      {/* Current value displayed on the right */}
      <div className={styles.sliderValue}>{value}</div>
    </div>
  );
};
