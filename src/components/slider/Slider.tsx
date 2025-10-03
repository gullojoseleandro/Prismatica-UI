import React from 'react';
import { Input } from '@components/input/Input';
import styles from '@styles/Slider.module.css';

/**
 * Props del componente `Slider`.
 * - `min`: valor mínimo del rango.
 * - `max`: valor máximo del rango.
 * - `value`: valor actual.
 * - `onChange`: callback con el nuevo valor numérico.
 * - `variant`: tema visual.
 * - `className`: clases CSS adicionales.
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
 * Control deslizante basado en `<input type="range">` estilizado.
 *
 * @example
 * ```tsx
 * <Slider min={0} max={100} value={50} onChange={setValor} />
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
      {/* Valor actual mostrado a la derecha */}
      <div className={styles.sliderValue}>{value}</div>
    </div>
  );
};
