import React from 'react';
import styles from '@styles/Spinner.module.css';

/**
 * Props del componente `Spinner`.
 * - `variant`: tema visual (light, dark, holographic, transparent-*).
 * - `size`: tamaño del spinner (small, medium, large).
 * - `className`: clases CSS adicionales.
 */
export interface SpinnerProps {
  /**
   * Tema visual del spinner.
   * @default 'light'
   */
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  /**
   * Tama o del spinner.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Clases CSS adicionales.
   */
  className?: string;
}

/**
 * Indicador de carga (spinner) simple y accesible.
 *
 * @example
 * ```tsx
 * <Spinner variant="dark" size="large" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = ({
  variant = 'light',
  size = 'medium',
  className,
  ...props
}) => {
  const spinnerClasses = [
    styles.spinner,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  // Elemento visual sin contenido, solo decorativo
  return <div className={spinnerClasses} {...props} />;
};