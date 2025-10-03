import React from 'react';
import { Typography } from '@components/typography/Typography';
import styles from '@styles/Toggle.module.css';

/**
 * Props del componente `Toggle`.
 * - Extiende atributos de `<input>` (excepto `type`).
 * - `variant`: tema visual.
 * - `label`: texto opcional al lado del switch.
 */
export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  variant?: 'light' | 'dark' | 'holographic' | 'transparent-light' | 'transparent-dark';
  label?: string;
}

/**
 * Interruptor (switch) accesible basado en `<input type="checkbox">`.
 *
 * @example
 * ```tsx
 * <Toggle checked={activo} onChange={(e) => setActivo(e.target.checked)} label="Activo" />
 * ```
 */
export const Toggle: React.FC<ToggleProps> = ({
  variant = 'light',
  label,
  className,
  ...props
}) => {
  const toggleClasses = [
    styles.toggle,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <label className={toggleClasses}>
      {/* El input de tipo checkbox es el que realmente hace el Trabajo */}
      <input type="checkbox" {...props} />
      {/* El span es el que se encarga de dibujar el switch */}
      <span className={styles.slider}></span>
      {/* El label es el que se encarga de mostrar el texto */}
      {label && <Typography variant="span" className={styles.label}>{label}</Typography>}
    </label>
  );
};